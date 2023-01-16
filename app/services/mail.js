const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  port: 25,
  auth: {
    user: "ashish.shivinfotech@gmail.com",
    pass: "jyockzbyzpfjnwtj",
  },
});

const sendOTP = (email, otp) => {
  const mailSend = {
    to: email,
    subject: "OTP for New Password",
    html: "OTP for New Password" + "<b>" + "  " + otp + "</b>",
  };

  const mail = transport.sendMail(mailSend, function (error) {
    if (error) {
      console.info(error);
    } else {
      console.info("Email is  sent");
    }
  });
  return mail;
};

module.exports = { sendOTP };
