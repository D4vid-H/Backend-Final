import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: process.env.MAIL_SMTP,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailer = async (options) => {
  try {
    const mailOptions = {
      from: "Nuevo Registro",
      to: process.env.MAIL_USER,
      subject: "Mail de prueba desde Node.js - cliente nuevo",
      html: `<h1 style="color: blue;">Se registro nuevo usuario<span style="color: green;">Node.js con Nodemailer</span></h1> <ul><li>${options.username}</li><li>${options.name}</li><li>${options.address}</li><li>${options.age}</li><li>${options.cellphone}</li></ul>`,
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(`este error es por el envio de mails: ${error}`);
  }
};

export default sendMailer;
