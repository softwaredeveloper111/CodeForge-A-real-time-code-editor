// import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: "smtp.gmail.com",
//   port: 587,          
//   secure: false, 

//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//   },

//   family: 4,

// });


// // Verify the connection configuration
//  transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });



// // Function to send email
// const sendEmail = async ({to, subject, text, html}) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Your Name" <${process.env.EMAIL_USER}>`, 
//       to, 
//       subject, 
//       text, 
//       html, 
//     });

//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };




// export default sendEmail
// export { transporter}








import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await resend.emails.send({
      from: "CodeForge <onboarding@resend.dev>",
      to:[to],
      subject,
      html,
    });
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendEmail;