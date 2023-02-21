const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('congresos_cursos', {
      id_congresocurso: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      titulo: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      fecha_inicio: {
        type: DataTypes.DATE(),
        allowNull: false
      },
      fecha_fin: {
        type: DataTypes.DATE(),
        allowNull: false
      },
      valor_dolar: {
        type: DataTypes.FLOAT(),
        allowNull: false
      },
      valor_pesos: {
        type: DataTypes.FLOAT(),
        allowNull: false
      }      
  }, { timestamps: false });
};