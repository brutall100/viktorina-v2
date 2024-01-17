const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
// todo ikelus i web keisti localhost i real addres
function sendWelcomeEmail(nick_name, user_email, uuid) {
  const welcomeMessage = `
<html>
    <head>
        <style>
        body {
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        .container {
            text-align: center;
            margin: 20px auto;
            padding: 20px;
            border-radius: 5px;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
        }
        .header {
            color: #007bff;
            font-size: 26px;
            margin-bottom: 15px;
        }
        .message {
            font-size: 18px;
            line-height: 1.5;
            padding: 10px;
        }
        .button {
            display: inline-block;
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
        }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Labas, ${nick_name}!</div>
            <div class="message">
                Jūsų registracija sėkminga. Norėdami patvirtinti savo el. pašto adresą, prašome paspausti šią nuorodą.
            </div>
            <a class="button" href="http://localhost:4000/confirm?uuid=${uuid}">Patvirtinti el. paštą</a>

            <div class="message">
                Taip pat galite nustatyti arba atkurti slaptažodį čia.
            </div>
            <a class="button" href="http://localhost:4000/reset-password">Keisti slaptažodį</a>
        </div>
    </body>
</html>
  `;

  const mailOptions = {
    from: "viktorina.live@gmail.com",
    to: user_email,
    subject: "Sveiki prisijunge prie Viktorina.live",
    html: welcomeMessage, // Use HTML content for styled email
  };

  // Sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendWelcomeEmail,
};
