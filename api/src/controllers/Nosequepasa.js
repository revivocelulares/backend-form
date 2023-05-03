const { dbconn } = require('../db');

const mierda = {
    listar_InscriptosPorCongreso: async (req, res) => {
        try {
            let idCongreso = req.params['idCongreso'];
            const query = "CALL sp_buscar_inscriptosPorCongreso(?)";
            
            let conn = await dbconn();
            conn.query(query, [idCongreso],
                (error, results, fields) => {
                    if(error) {
                        console.error(error.message);
                    }
                    const respuesta = results[0].map(element => {
                        return {
                            email: element.email,
                            nombre: element.nombre,
                            apellido: element.apellido,
                            pais: element.pais,
                            profesion: element.profesion,
                            isResident: element.isResident,
                            isMember: element.isMember,
                            id_pago: element.detalle_pago.map(e => e.status).toString() === 'approved' 
                                        ? element.detalle_pago.map(e => e.payment_id).toString()
                                        : element.detalle_pago.map(e => e.id).toString(),
                            estado_pago: element.detalle_pago.map(e => e.status).toString(),
                            pagado_usd: element.pagado_usd,
                            pagado_ars: element.pagado_ars,
                            metodo_pago: element.detalle_pago.map(e => e.status).toString() === 'approved' ? 'Mercado Pago' : 'PayPal'
                        }
                    });
                    res.status(200).json(respuesta);
                }
            );
            conn.end();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = mierda;
