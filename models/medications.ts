var Sequelize = require("sequelize");

var Medications = (sequelize: any, type: any) => {
  return sequelize.define("medications", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    weight: Sequelize.DECIMAL(12, 2),
    code: Sequelize.STRING,
    image: Sequelize.STRING,
    drone_id: Sequelize.STRING,
  });
};

module.exports = Medications;
