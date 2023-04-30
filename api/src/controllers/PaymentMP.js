const mercadopago = require('mercadopago');
require('dotenv').config();

const payment = {
    paymentmethod: (req, res) => {
        mercadopago.configure({ access_token: process.env.ACCESS_TOKEN_MP});
        let preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity)
                }
            ],
            back_urls: {
                "success": "http://localhost:3001/feedback",
                "failure": "http://localhost:3001/feedback",
                "pending": "http://localhost:3001/feedback"
            },
            auto_return: "approved"
        };
        
        mercadopago.preferences
        .create(preference)
        .then(function (response) {
			res.json({
				id: response.body.id
			});
		})
        .catch((error) => {
            console.log('ERROR: ' + error);
            return res.status(500).send(error);
        });
    },
    feedback: (req, res) => {
        res.status(200).json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        });
    }
};

module.exports = payment;