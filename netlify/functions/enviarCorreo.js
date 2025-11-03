const { config } = require("dotenv")
const nodemailer = require("nodemailer")
config()

const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = Number(process.env.MAIL_PORT || 587)
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS
const MAIL_SECURE =
  typeof process.env.MAIL_SECURE !== "undefined"
    ? process.env.MAIL_SECURE === "true"
    : MAIL_PORT === 465 // si no está definido, assume secure=true solo para 465

if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
  console.warn("Faltan variables de entorno MAIL_HOST/MAIL_USER/MAIL_PASS")
}

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE, // true para 465 (SMTPS), false para 587 (STARTTLS)
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  // opcional: ajustar TLS si el servidor necesita
  tls: {
    // evita fallos con certificados auto-firmados en entornos de prueba
    rejectUnauthorized: process.env.MAIL_REJECT_UNAUTHORIZED !== "false",
  },
})

async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  }

  return transporter.sendMail(mailOptions)
}

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Método no permitido" }
    }

    const body = JSON.parse(event.body || "{}")
    const { email, firstName, lastName } = body

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Falta campo email" }) }
    }

    const clientText = `Hola ${firstName || ""} ${lastName || ""},\n\nHemos recibido tu compra. Gracias.`
    const adminText = `Nueva compra de ${firstName || ""} ${lastName || ""} - correo: ${mail}`

    // AWAIT: importante esperar a que terminen los envíos
    await Promise.all([
      sendEmail(email, "Compra Exitosa", clientText, `<p>${clientText}</p>`),
      sendEmail(MAIL_USER, "Nuevo pedido recibido", adminText, `<p>${adminText}</p>`),
    ])

    console.log("Solicitud recibida:", body)

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Solicitud procesada correctamente" }),
    }
  } catch (err) {
    console.error("Error enviarCorreo:", err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Error interno al procesar la solicitud" }),
    }
  }
}
