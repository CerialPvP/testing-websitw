require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mailer = require("nodemailer");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
})

async function submitToEmail(headers) {
    console.log(headers)
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SEND_EMAIL,
            pass: process.env.SEND_PASS
        }
    });

    let info = transporter.sendMail({
        from: `'SYSTEM' <${process.env.SEND_EMAIL}>`,
        to: process.env.RECEIVE_EMAIL,
        subject: `New Application (from ${headers.rblxUsername})`,
        text: `Roblox Username: ${headers.rblxUsername}\nEmail: ${headers.sendEmail}`
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

app.get("/submit", (req, res) => {
    submitToEmail(JSON.stringify(req.headers));
})


app.listen(process.env.PORT, () => {
    console.log(`The app is ready on port ${process.env.PORT}`)
})