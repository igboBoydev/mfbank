var Sequelize = require("sequelize");

var Drones = (sequelize: any, type: any) => {
  return sequelize.define("drones", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: Sequelize.STRING,
    serial_num: Sequelize.STRING,
    model: Sequelize.STRING,
    weight: Sequelize.DECIMAL(12, 2),
    availabile_weight: Sequelize.DECIMAL(12, 2),
    battery_capacity: Sequelize.INTEGER,
    state: Sequelize.STRING,
  });
};

module.exports = Drones;
