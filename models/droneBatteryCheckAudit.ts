var Sequelize = require("sequelize");

var BatteryAudit = (sequelize: any, type: any) => {
  return sequelize.define("battery_audit", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: Sequelize.STRING,
    drone_id: Sequelize.STRING,
    battery_level: Sequelize.INTEGER,
  });
};

module.exports = BatteryAudit;
