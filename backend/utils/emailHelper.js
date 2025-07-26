// utils/emailHelper.js
import nodemailer from 'nodemailer';

export const sendNotification = async (userEmail, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: '',
      },
    });

    const mailOptions = {
      from: '',
      to: userEmail,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail} with subject: "${subject}"`);
  } catch (error) {
    console.error(`Error sending email to ${userEmail}: ${error.message}`);
  }
};
