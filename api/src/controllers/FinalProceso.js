const { dbconn } = require('../db');
const mysql = require('mysql2/promise');
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;
const { getNombre, 
        getApellido, 
        getTitulo, 
        getFechaCongreso, 
        getDescripcion, 
        getPagadoUSD, 
        getPagadoARS, 
        getIdPago, 
        getEstadoPago, 
        getMetodoPago } = require('./Data')
const sendMail = require('./Mailer');


const finalProceso = {
    final: async (req, res) => {
        try {
            let resp_inscripto, resp_pago, resp_comprobante;
            let { 
                    email, 
                    nombre, 
                    apellido, 
                    pais, 
                    profesion, 
                    isResident, 
                    isMember, 
                    detalle, 
                    monto_abonado_usd, 
                    monto_abonado_ars, 
                    fecha_inscripcion, 
                    idCongreso 
                } = req.body;

            if(isMember != 1 || isMember === 1) {
                const connect = await mysql.createConnection({
                    host: SIBEN_DB_HOST,
                    user: SIBEN_DB_USER,
                    password: SIBEN_DB_PASSWORD,
                    database: SIBEN_DB_NAME
                });
                const [rows, fields] = await connect.execute(`SELECT * FROM users WHERE email=? AND group_id=3 AND active=1`, [email]);
                const verify_email = rows.length > 0 ? rows[0]?.email : null;
                console.log('VERIFY_EMAIL: ' + verify_email);
                if(verify_email === email) {
                   isMember = 1;
               } else {
                   isMember = 0;
               }               
            }
            const query = "CALL sp_crear_inscripto(?,?,?,?,?,?,?)";

            const conn = await dbconn();
            //console.log('isMember ---------------- ' + isMember);
            conn.query(query, [email, nombre, apellido, pais, profesion, isResident, isMember],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    resp_inscripto = results.affectedRows;
                    // console.log('inscripto ' + resp_inscripto);
                }
            );

            const query1 = "CALL sp_crear_respuesta_pago(?,?,?,?)";
            
            conn.query(query1, [JSON.stringify(detalle), monto_abonado_usd, monto_abonado_ars, email],
                async (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    resp_pago = results.affectedRows;
                    // console.log('pago ' + resp_pago);
                    if(resp_pago === 1) {
                        let info = {
                            confirmPago: true,
                            email: email,
                            nombre: await getNombre(email),
                            apellido: await getApellido(email),
                            pagado_usd: await getPagadoUSD(email),
                            pagado_ars: await getPagadoARS(email),
                            id_pago: await getIdPago(email),
                            estado_pago: await getEstadoPago(email),
                            metodo_pago: await getMetodoPago(email)
                        }
                        //console.log('INFO_PAGO --- ' + JSON.stringify(info));
                        await sendMail(info);
                    }
                }
            );

            const query2 = "CALL sp_crear_comprobante(?,?,?)";
            
            conn.query(query2, [fecha_inscripcion, idCongreso, email],
                async (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    resp_comprobante = results.affectedRows;
                    // console.log('comprobante ' + resp_comprobante);
                    if(resp_comprobante === 1) {
                        let info = {
                            confimInscription: true,
                            email: email,
                            nombre: await getNombre(email),
                            apellido: await getApellido(email),
                            titulo: await getTitulo(idCongreso),
                            fecha_congreso: await getFechaCongreso(idCongreso),
                            descripcion: await getDescripcion(idCongreso),
                        }
                        //console.log('INFO --- ' + JSON.stringify(info));
                        await sendMail(info);
                    }
                }
            );
            conn.end();

            res.status(200).json({ mensaje: "Operacion terminada con exito"});

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = finalProceso;