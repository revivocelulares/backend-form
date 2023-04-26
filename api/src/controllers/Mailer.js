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
        let nombre = '';
        let apellido = '';
        let titulo = '';
        let fecha_congreso = '';
        let descripcion = '';
        let id_pago = '';
        let pagado_usd = '';
        let pagado_ars = '';
        let estado_pago = '';
        let metodo_pago = '';
        let imagen = '';
        let newimg = '';
        let subject = '';
        let loads = '';

        if(info.confimInscription) {
            filePath = path.join('plantillaMail', '../view/plantillaMail.html');
            source = fs.readFileSync(filePath, 'utf-8').toString();
            template = Handlebars.compile(source);
            user = info.email;
            nombre = info.nombre;
            apellido = info.apellido;
            titulo = info.titulo;
            fecha_congreso = info.fecha_congreso;
            descripcion = info.descripcion;
            imagen = info.titulo + '.jpg';
            newimg = imagen.replace(/ /g, "%20");
            subject = "Confirmación de Inscripsión";
            loads = ({nombre, apellido, titulo, fecha_congreso, descripcion, newimg});
        }

        if(info.confirmPago) {
            if(info.metodo_pago && info.metodo_pago === 'PayPal') {
                filePath = path.join('plantillaPago', '../view/plantillaPago.html');
            } else {
                filePath = path.join('plantillaPago', '../view/plantillaPagoMP.html');
            }
            source = fs.readFileSync(filePath, 'utf-8').toString();
            template = Handlebars.compile(source);
            user = info.email;
            nombre = info.nombre;
            apellido = info.apellido;
            id_pago = info.id_pago;
            estado_pago = info.estado_pago;
            metodo_pago = info.metodo_pago;
            pagado_usd = info.pagado_usd;
            pagado_ars = info.pagado_ars;
            subject = "Confirmación del Pago de la Inscripsión";
            loads = ({nombre, apellido, id_pago, estado_pago, metodo_pago, pagado_usd, pagado_ars})
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