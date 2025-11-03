export function generarHtmlCompra({ nombre, receta, precio }: { nombre: string; receta: string; precio: string }) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Confirmación de compra</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          .title {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p class="title">Hola <strong>${nombre}</strong>,</p>
          <p>Hemos recibido tu compra de la receta <strong>${receta}</strong>.</p>
          <p>El precio total es <strong>$ ${precio}</strong>.</p>
          <p>Te enviaremos más detalles a tu correo electrónico pronto.</p>
          <p class="footer">Gracias por tu compra.</p>
        </div>
      </body>
    </html>
  `;
}
