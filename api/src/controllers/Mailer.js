const Handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

async function mailer(info) {
    try {
        let transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "congreso_siben@outlook.com",
                pass: "S1benTest"
            }
        });

        let filePath = '';
        let source = '';
        let template = '';
        let user = info.email;
        let subject = '';
        let loads = '';

        if(info.confimInscription) {
            filePath = path.join('confimInscription', '../view/confimInscription.html');
            source = fs.readFileSync(filePath, 'utf-8').toString();
            template = Handlebars.compile(source);
            user = info.email;
            subject = "Confirmación de Inscripsión";
            loads = ({info});
        }

        let options = await transporter.sendMail({
            from: 'congreso_siben@outlook.com',
            to: user,
            subject: subject,
            html: template(loads)
        });
        console.log('SERA QUE SI ------------------- ' + options.messageId);
        return options.messageId;

    } catch (error) {
        console.log(error);
    }
}

module.exports = mailer;