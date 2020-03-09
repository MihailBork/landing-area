const nodemailer = require('nodemailer');

async function sendEmail(name, email, phone) {
    console.log(process.env.EMAIL_USERNAME);
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }, (err) => {
        console.log(err);
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `Новая заявка на курс по Digital`,
        text: `Новая заявка на курсы по Digital от пользователя ${name}.\nТелефон: ${phone}\nE-mail: ${email}`
    });
}

module.exports = {
    register: function (req, res, next) {
        const {name, email, phone} = req.body;
        console.log(req.body.name, req.query.email, phone);
        sendEmail(name, email, phone)
            .then(response => {
                res.status(200).json({
                    ok: true,
                    message: "Email sent"
                });
            })
            .catch(err => {
                res.status(500).json({
                    ok: false,
                    message: err.response || "Error in email sending"
                });
            })
    }
};