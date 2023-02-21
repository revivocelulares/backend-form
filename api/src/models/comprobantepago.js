const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comprobantepago', {
    id_comprobante: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
  },
  comprobante_date: {
    type: DataTypes.DATE(),
    allowNull: false
  },
  comprobante_detail: {
    type: DataTypes.JSON(),
    allowNull: false
  },
  comprobante_ammount: {
    type: DataTypes.FLOAT(),
    allowNull: false
  }

  }, { timestamps: false });
};