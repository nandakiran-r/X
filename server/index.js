const express = require('express');
const app = express();
require("dotenv").config()
var cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use any SMTP provider
  auth: {
    user: 'iedcemeadeveloper@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

app.get('/', (req, res) => {
  res.send("Hello World")
});

app.post('/send-email', async (req, res) => {
  const { title, content, to } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `Notification: ${title}`,
    text: `${content}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send report' });
  }
});

const port = process.env.PORT || 2000;

app.listen(port, () => {

  console.log(`Server listening on port ${port}`);

});
