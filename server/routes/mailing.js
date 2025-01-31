const nodemailer = require('nodemailer')

const sendMail = (recipient, message, subject) => {
    console.log(process.env.USER)
    console.log(process.env.PASS)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'donoftime2018@gmail.com',
          pass: 'hikvrznyiltxmsuf'
        }
      });
      
      var mailOptions = {
        from: 'donoftime2018@gmail.com',
        to: recipient,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendMail