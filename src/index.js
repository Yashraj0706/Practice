require('dotenv').config(); // remember this for getting env file
const nodemailer = require('nodemailer');

module.exports = async function (req, res) {
    // Extracting the username and password from headers
    const authUser = req.headers['username']; // or whatever header name you prefer
    const authPass = req.headers['password'];

    // Validate the username and password
    if (authUser !== process.env.AUTH_USERNAME || authPass !== process.env.AUTH_PASSWORD) {
        return res.status(401).send('Unauthorized: Invalid username or password.');
    }

    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).send('Please provide all required fields: to, subject, text.');
    }

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Your email
            pass: process.env.EMAIL_PASS   // Your email password or app password
        }
    });

    // Send email
    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        });
        res.send(`Email sent successfully to ${to}.`);
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
};