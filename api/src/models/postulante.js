const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('postulante', {
      id_postulante: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(),
        allowNull: false
      },
      profesion: {
        type: DataTypes.ENUM(),
        values: ["Médico", "Enfermero", "Kinesiólogo", "Psicólogo", "Fonoaudiólogo", "Otra Disciplina"],
        allowNull: false
      },
      isMember: {
        type: DataTypes.BOOLEAN(),
        allowNull: true
      },
      isResident: {
        type: DataTypes.BOOLEAN(),
        allowNull: true
      }
  }, { timestamps: false });
};