const Handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

async function mailer(info) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "congresos@siben.net",
                pass: "Osaka2020"
            },
            
        });

        let filePath = '';
        let source = '';
        let template = '';
        let user = info.email;
        let nombre = info.nombre;
        let apellido = info.apellido;
        let titulo = info.titulo;
        let fecha_congreso = info.fecha_congreso;
        let descripcion = info.descripcion;
        let imagen = 'data:image/jpg;base64,' + info.imagen;
        let subject = '';
        let loads = '';

        if(info.confimInscription) {
            filePath = path.join('confimInscription', '../view/confimInscription.html');
            source = fs.readFileSync(filePath, 'utf-8').toString();
            template = Handlebars.compile(source);
            user = info.email;
            nombre = info.nombre;
            apellido = info.apellido;
            titulo = info.titulo;
            fecha_congreso = info.fecha_congreso;
            descripcion = info.descripcion;
            imagen = 'data:image/jpg;base64,' + info.imagen;
            subject = "Confirmación de Inscripsión";
            loads = ({nombre, apellido, titulo, fecha_congreso, descripcion, imagen});
        }

        let options = await transporter.sendMail({
            from: 'congresos@siben.net',
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