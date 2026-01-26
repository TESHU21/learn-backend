import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendOtpEmail = async (email, otp) => {
  try {
    console.log("OTP from", otp);
    const emailParams = new EmailParams()
      .setFrom(
        new Sender(process.env.MAIL_FROM_EMAIL, process.env.MAIL_FROM_NAME)
      )
      .setTo([new Recipient(email)])
      .setSubject("Password Reset OTP").setHtml(`
        <p>Your password reset code is:</p>
        <h2>${otp}</h2>
        <p>This code expires in {process.env.OTP_EXPIRY_MINUTES} minutes.</p>
      `);

    await mailersend.email.send(emailParams);
  } catch (error) {
    console.error("OTP email sending failed:", error);
    throw new Error("Failed to send OTP email");
  }
};
