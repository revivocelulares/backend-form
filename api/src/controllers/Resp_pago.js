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
    }
}

module.exports = resp_pago;