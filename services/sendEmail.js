const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

const createEmail = (email, verificationToken) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Phonebook",
      link: "http://localhost:3000",
    },
  });

  const emailTemplate = {
    body: {
      name: email,
      intro: "Welcome to Phonebook! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Phonebook, please click here:",
        button: {
          text: "Confirm your account",
          link: `http://localhost:3000/api/users/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  return mailGenerator.generate(emailTemplate);
};

const sendEmail = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const newEmail = createEmail(email, verificationToken);

  const msg = {
    to: email,
    from: "mollinne2@gmail.com",
    subject: "Confirm your account",
    html: newEmail,
  };

  await sgMail.send(msg);
};
module.exports = sendEmail;
