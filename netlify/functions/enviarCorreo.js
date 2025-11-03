exports.handler = async (event,context) => {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Método no permitido',
    };
  }

  const { nombre, apellido, mail, mensaje } = JSON.parse(event.body);

  // Acá iría el envío de correo (con nodemailer, resend, etc.)
  console.log('Solicitud recibida:', { nombre, apellido, mail, mensaje });

  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: 'Solicitud procesada correctamente' }),
  };
};
