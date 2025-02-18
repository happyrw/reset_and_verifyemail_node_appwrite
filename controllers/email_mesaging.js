import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const SendGridEmail = (to, emailTemplate) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const sendMail = async (msg) => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  };

  sendMail({
    to: to,
    from: {
      email: "happybrown08@gmail.com",
      name: "Versus Community",
    },
    subject: "Nodejs says Hello!",
    html: emailTemplate,
  });
};

export { SendGridEmail };
