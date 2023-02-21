const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('respuesta_pago', {
    id_pago: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    pago_gateway: {
        type: DataTypes.STRING(),
        allowNull: false
    },  
    pago_status: {
        type:DataTypes.ENUM(),
        values: ['Acredited', 'Aprobed', 'Pending', 'Rejected'],
        allowNull: false
    },
    });
};