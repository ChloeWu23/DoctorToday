const router = require("express").Router();

const nodemailer = require("nodemailer")

async function sendEmail(data){
    try {
        //this.isSending = true;
        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'tiankgt@hotmail.com',
                pass: 'Ic20088203!'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const plainText = "Dear " + data.name + "\n" + "This is the slots you have chosen: \n"
        + data.slotSelect1 + "\n" + data.slotSelect2 + "\n" + data.slotSelect3 + "\n"
        + "we will get back to you as soon as possible for the arrangement of yout visit."
        let mailOptions = {
            from: "tiankgt@hotmail.com",
            to: data.email,
            subject: "Automatic reply",
            text: plainText
            // html: "<b>Dear <b>" + <b>this.request.name,</b> + "<b></b>"
        };

        let info = await transporter.sendMail(mailOptions);
        if (info.accepted.length > 0) {
            console.log('Email sent successfully');
        } else {
            console.log('Email not sent');
        }

    } catch (err) {
        console.log(err);
        console.log('Error sending email');
    } finally {
        //this.isSending = false;
    }
}

router.post('/', (req, res) => {
    // const fs = require('fs');
    // const data = JSON.parse(
    //   fs.readFileSync('./config-data/data.json')
    // );
    // console.log(data);
    console.log("hello here");
    //console.log(req.body.email);
    console.log("slot 1 is" + req.body.slotSelect1);
    if (!req.body.email) {
        res.status(400).send({
          message: "Email address can not be empty!",
        });
        return;
      }
    //console.log(req.body.email);
    sendEmail(req.body)
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
  });

  module.exports = router;
