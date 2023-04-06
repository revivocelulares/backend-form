const { dbconn } = require('../db');

const resp_pago = {
    addNewRespPago: async (req, res) => {
        try {
            let { detalle, monto_abonado_usd, monto_abonado_ars, email } = req.body;
            const query = "CALL sp_crear_respuesta_pago(?,?,?,?)";

            const conn = await dbconn();
            conn.query(query, [detalle, monto_abonado_usd, monto_abonado_ars, email],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    res.status(200).json(results.affectedRows);
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    },
    getRespuestaPago: async (req, res) => {
        try {
            let email = req.params['email'];
            const query = "CALL sp_listar_respuesta_pago(?)";

            const conn = await dbconn();
            conn.query(query, [email], (error, results, fields) => {
                if(error) {
                    console.error(error.message);
                }
                const resp = results[0].map(element => {
                    return {
                        id_pago: element.detalle.map(e => e.id).toString(),
                        estado_pago: element.detalle.map(e => e.status).toString(),
                        pagado_usd: element.monto_abonado_usd,
                        pagado_ars: element.monto_abonado_ars,
                        metodo_pago: element.detalle.map(e => e.status).toString() === 'approved' ? 'Mercado Pago' : 'PayPal'
                    }
                });
                res.status(200).json(resp);
            });
            conn.end();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = resp_pago;