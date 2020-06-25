const nodemailer = require('nodemailer');
const express = require('express');
const fs = require('fs');

const app = express();
const handlebars = require('handlebars');

async function generateTestAccount() {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    return await nodemailer.createTestAccount();
  } catch (e) {
    console.log('e', e);
    throw e;
  }
}

async function sendMail(mailOptions) {
  try {
    const account = {
      user: 'bill.s@pannucorp.com',
      pass: '1GKqc942a3MXtxOD'
    };

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      service: 'sendinblue',
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });

    mailOptions.from = account.user;

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info.messageId;
  } catch (e) {
    throw e;
  }
}

async function sendForgotPasswordLink(options) {
  try {
    let flag = false;

    if (options.user && options.link) {
      const user = options.user;
      // setup email data with unicode symbols
      const mailOptions = {
        from: 'abc@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Forgot Password.', // Subject line
        html: `<p>Hello ${user.name}.
                  <a href=${options.link} target="_blank">Click Here</a> to reset your password</p><br/>` // html body
      };

      await sendMail(mailOptions);
      flag = true;
    }
    return flag;
  } catch (e) {
    throw e;
  }
}

async function sendEmailWithType(user, email, type, data) {
  try {
    const mailOptions = {
      from: 'bill.s@pannucorp.com',
      to: email
    };
    switch (type) {
      case 'Test_Email':
        const mailer = mailOptions;
        const template = `${process.cwd()}/server/views/emailTemplates/testEmail.html`;
        fs.readFile(template, 'utf8', function(err, file) {
          const template = handlebars.compile(file);
          const replacements = {
            name: data.name
          };
          const htmlToSend = template(replacements);
          if (err) {
            console.log(`template: ${template}`);
            console.log('ERROR!');
          } else {
            mailer.subject = 'Welcome to the Test Email';
            mailer.text = 'Welcome to the Test Email';
            mailer.html = htmlToSend;
            // await sendMail(mailOptions);
            sendMail(mailOptions);
          }
        });
        break;

      default:
        mailOptions.subject = 'Default Email';
        mailOptions.text = 'Default Email';
        mailOptions.html = '<h2>Hello World</h2>'; // html body
        await sendMail(mailOptions);
    }
  } catch (e) {
    throw e;
  }
}

module.exports = {
  sendMail,
  sendForgotPasswordLink,
  sendEmailWithType
};

//   case 'Test_Email':
//     const mailer = mailOptions;
//     const templateME = `${process.cwd()}/server/views/emailTemplates/testEmail.html`;
//     const htmlTemplate = await fs.readFile(templateME, 'utf8');

//     let template = handlebars.compile(file);
//     const replacements = {
//       name: data.name
//     };
//     const htmlToSend = template(replacements);
//     if (err) {
//       console.log(`template: ${template}`);
//       console.log('ERROR!');
//     } else {
//       mailer.subject = 'Welcome to the Test Email';
//       mailer.text = 'Welcome to the Test Email';
//       mailer.html = htmlToSend;
//       // await sendMail(mailOptions);
//       sendMail(mailOptions).then(function(response) {
//         return response;
//       });
//     }
