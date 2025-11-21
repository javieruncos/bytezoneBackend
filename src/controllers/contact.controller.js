import { createTransporter } from "../config/mailer.js";

export const sendContactEmail = async (req, res) => {
  try {
    const { nombre, email, mensaje,asunto,telefono } = req.body;
    if (!nombre || !email || !mensaje || !asunto) {
      return res.status(400).json({
        success: false,
        message: "Todos los datos son obligatorios",
      });
    }

    const transporter = createTransporter();
    //correo para el administrador
    await transporter.sendMail({
      from:`"Mi Ecommerce" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "Nuevo mensaje de contacto",
      html: `
            <h1>Nuevo mensaje de contacto</h1>
            <ul>
                <li>Nombre: ${nombre}</li>
                <li>Email: ${email}</li>
                <li>Teléfono: ${telefono || "No enviado"}</li>
                <li>Mensaje: ${mensaje}</li>
                <li>asunto: ${asunto}</li>
            </ul>
            `,
    });

    await transporter.sendMail({
      from: `"Mi Ecommerce" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Gracias por contactarnos",
      html: `
        <h3>Hola ${nombre},</h3>
        <p>Gracias por tu mensaje sobre <strong>${asunto}</strong>.</p>
        <p>Recibimos tu mensaje y responderemos pronto.</p>
        <br/>
        <p>Saludos,<br/>Equipo de ByteZone</p>
      `,
    });


    return res.status(200).json({
        success: true,
      message: "Correo enviado correctamente",
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
      message: "Error al enviar el correo",
    })
  }
};
