const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateResetToken() {
  return uuidv4();
}

async function sendResetEmail(email, token, PORT) {
  const resetLink = `http://localhost:${PORT}/reset/${token}`;
  const validityPeriodHours = 1;
  const mailOptions = {
    from: 'viktorina.live@gmail.com',
    to: email,
    subject: 'Slaptažodžio keitimo nuoroda',
    html: `
      <html>
      <head>
        <style>
          .email-container {
            background-color: #f0f0f0;
            padding: 20px;
            text-align: center;
            width: 800px;
            margin: 0 auto; /* Center horizontally */
          }
          .button {
            display: inline-block;
            background-color: #1155CC !important; 
            color: #ffffff !important; 
            padding: 10px 20px; 
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold; /* Make the text bold */
            transition: background-color 0.3s, color 0.3s; 
          }
          .button:hover {
            background-color: #0E46B3 !important; 
          }
          .message {
            color: #666;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1 style="color: #333;">Slaptažodžio keitimo nuoroda</h1>
          <p style="color: #666;">Norėdami pasikeisti slaptažodį, paspauskite žemiau esantį mygtuką:</p>
          <a href="${resetLink}" class="button">Keisti slaptažodį</a>
          <p class="message">Slaptažodžio keitimo nuoroda galioja ${validityPeriodHours} valandą.</p>
          <h4 class="message">Jeigu šis laiškas jums nepriklauso arba nežinote, kas jį išsiuntė, prašome ignoruoti šį laišką.</h4>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  generateResetToken,
  sendResetEmail,
};
