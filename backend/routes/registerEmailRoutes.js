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
        // const plainText = "Hi " + data.firstName + "," + "\n\n"
        // + "These are the slots you have chosen:" + "\n\n"
        // + slotSelect1.start + " - " + slotSelect1.end + " on " + slotSelect1.day + "\n"
        // + slotSelect2.start + " - " + slotSelect2.end + " on " + slotSelect2.day + "\n"
        // + slotSelect3.start + " - " + slotSelect3.end + " on " + slotSelect3.day + "\n\n"
        // + "We will get back to you as soon as possible for the final arrangement of your visit."
        // + "Thank you for registering with DoctorToday!"

        let mailOptions = {
            from: "tiankgt@hotmail.com",
            to: data.email,
            subject: "Automatic reply: Registration Email",
            // text: plainText
            html: `
            <html>
            <head>
              <title>Registration Confirmation</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif;">
              <table style="max-width: 600px; margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px; background-color: #FFFFFF;">
                    <h1 style="font-size: 24px; margin-bottom: 20px;">Registration Confirmation</h1>
                    <p>Dear ${data.firstName},</p>
                    <p>Thank you for registering with DoctorToday. Your registration is confirmed.</p>
                    <p>If you have any questions or need assistance, please contact us at enquiries@doctortoday.co.uk or 020 7433 1444
          </p>
                    <p>Thank you,</p>
                    <p>DoctorToday</p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
            `
           //<img src=http://localhost:3000/frontend-user/src/assets/doctor_today.jpg alt="Clinic Logo" style="max-width: 100%; height: auto;">
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
  module.exports.sendRegisterEmail = sendRegisterEmail;