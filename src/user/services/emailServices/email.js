var nodemailer = require("nodemailer");
require("dotenv").config();

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const sendMail = async ({ toEmail, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587, // Use the appropriate port for your configuration
      secure: false, // Set to true for SSL/TLS, false for non-secure
      auth: {
        user: "info@tarashainteriors.com", // Your GoDaddy email address
        pass: "tarasha@069", // Your GoDaddy email password
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: true,
    });

    var mailOptions = {
      from: `"Tarasha Interior" info@tarashainteriors.com`, // sender address (who sends)
      to: toEmail, // list of receivers (who receives)
      subject: subject, // Subject line
      // text: 'Kuhedu ', // plaintext body
      html: html, // html body
    };

    // send mail with defined transport object
    const res = await transporter.sendMail(mailOptions);
    if (res.accepted.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendMail;
