require("dotenv").config();
// const tools = require("../utils/packages");
const Sequelizes = require("sequelize");

var db: any = {};

var sequelize = new Sequelizes(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      freezeTableName: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to mysql database has been established successfully"
    );
  })
  .catch((error: any) => {
    console.error("Unable to connect to mysql database: ", error);
  });

db.sequelize = sequelize;

db.Drones = require("../models/drones")(sequelize, Sequelizes);
db.Medications = require("../models/medications")(sequelize, Sequelizes);
db.BatteryAudit = require("../models/droneBatteryCheckAudit")(
  sequelize,
  Sequelizes
);

// database associations
db.Medications.belongsTo(db.Drones, {
  foreignKey: "drone_id",
  as: "drone_medications",
});

module.exports = db;
