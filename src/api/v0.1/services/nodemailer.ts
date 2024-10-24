interface sendMail {
  email: string;
  randomNumber: number;
}

import nodemailer from "nodemailer";


// console.log(process.env.NODEMAILER_EMAIL)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'apurvjha1234@gmail.com',
    pass: 'gvll jrjs jyyb pfqh',
  },
});

export const sendMail = ({ email, randomNumber }: sendMail) => {
  const html = `
<h1>Welcome to our ChatBot AI</h1>
<p>Your OTP Is ${randomNumber}</p>
`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "One Time Password",
    html: html,
  };
  return new Promise((resolve, reject)=>{
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          resolve(false)
        } else {
          console.log("Email sent: " + info.response);
          resolve(true)
        }
      });
  })
};
