const { config } = require('dotenv');
const nodemailer = require('nodemailer');
config();

const transporter = nodemailer.createTransport({  
  host: process.env.MAIL_HOST,
  port: 587,
  secure:true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
}

exports.handler = async (event,context) => {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Método no permitido',
    };
  }

  const { mail, firstName, lastName } = JSON.parse(event.body);

  sendEmail(mail, 'Compra Exitosa', `Nombre: ${firstName} ${lastName}`);

  sendEmail(process.env.MAIL_USER, 'Nuevo pedido recibido', `Has recibido un nuevo pedido  de ${firstName} ${lastName}, correo: ${mail}`);
  // Acá iría el envío de correo (con nodemailer, resend, etc.)
  
  console.log('Solicitud recibida:', JSON.parse(event.body));

  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: 'Solicitud procesada correctamente' }),
  };
};
