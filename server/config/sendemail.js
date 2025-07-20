import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error('RESEND_API environment variable is not set');
}


const resend = new Resend(process.env.RESEND_API);

const sendEmail = async (sendTo, subject, html) => {
  try {
    const {data,error} = await resend.emails.send({
    from: '20 Deg <onboarding@resend.dev>',
    to: sendTo,
    subject: subject,
    html: html,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }

  return data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message || error}`);
  }
};

export default sendEmail;