const mysql = require('mysql2/promise');
require('dotenv').config();
const { SIBEN_DB_USER, SIBEN_DB_PASSWORD, SIBEN_DB_HOST, SIBEN_DB_NAME } = process.env;

const mails = {
    listarMailsSiben: async (res, req) => {
        try {
            const connect = await mysql.createConnection({
                host: SIBEN_DB_HOST,
                user: SIBEN_DB_USER,
                password: SIBEN_DB_PASSWORD,
                database: SIBEN_DB_NAME
            });

            const [rows, fields] = await connect.execute(`SELECT * FROM users WHERE group_id=3 AND active=1`);
            if(rows.length > 0) {
                let mails = rows[0]?.email;
                res.status(200).json(mails);
            } else {
                res.status(404).send({msg: 'No se encontraron emails'});
            }
            await connect.end();            
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = mails;