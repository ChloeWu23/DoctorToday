const router = require("express").Router();

const nodemailer = require("nodemailer")

async function sendRegisterEmail(data){
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

        // console.log("here"+typeof(data.slotSelect1))
        // slotSelect1 = JSON.parse(JSON.stringify(data.slotSelect1))
        // slotSelect2 = JSON.parse(JSON.stringify(data.slotSelect2))
        // slotSelect3 = JSON.parse(JSON.stringify(data.slotSelect3))
        // console.log(slotSelect1)
        // console.log(typeof(slotSelect1))
        // console.log(slotSelect1.end)
        const plainText = "Hi " + data.firstName + "," + "\n\n"
        // + "These are the slots you have chosen:" + "\n\n"
        // + slotSelect1.start + " - " + slotSelect1.end + " on " + slotSelect1.day + "\n"
        // + slotSelect2.start + " - " + slotSelect2.end + " on " + slotSelect2.day + "\n"
        // + slotSelect3.start + " - " + slotSelect3.end + " on " + slotSelect3.day + "\n\n"
        // + "We will get back to you as soon as possible for the final arrangement of your visit."
        + "Thank you for registering with DoctorToday!"

        let mailOptions = {
            from: "tiankgt@hotmail.com",
            to: data.email,
            subject: "Automatic reply",
            text: plainText
            // html: "<b>Dear <b>" + <b>this.request.name,</b> + "<b></b>"
        };

        let info = await transporter.sendMail(mailOptions);
        if (info.accepted.length > 0) {
            console.log('REmail sent successfully');
        } else {
            console.log('REmail not sent');
        }

    } catch (err) {
        console.log(err);
        console.log('Error sending REmail');
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
    // console.log("slot 1 is" + req.body.slotSelect1);
    if (!req.body.email) {
        res.status(400).send({
          message: "REmail address can not be empty!",
        });
        return;
      }
    if (!req.body.firstName) {
        res.status(400).send({
          message: "First Name can not be empty!",
        });
        return;
      }
    //console.log(req.body.email);
    sendRegisterEmail(req.body)
    .then(data => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
      })
  });

  module.exports = router;