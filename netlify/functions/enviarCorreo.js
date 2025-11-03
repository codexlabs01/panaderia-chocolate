exports.handler = async (event,context) => {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Método no permitido',
    };
  }

 
  // Acá iría el envío de correo (con nodemailer, resend, etc.)
  console.log('Solicitud recibida:', JSON.parse(event.body));

  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: 'Solicitud procesada correctamente' }),
  };
};
