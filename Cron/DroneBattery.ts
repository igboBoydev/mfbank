export {};
const Queue = require("bull");
const Redis = require("ioredis");
const util = require("../utils/packages");
const db = require("../database/mysql");
require("dotenv").config();

//redis config
const redis = new Redis();

//producer
const queue = new Queue("drone-battery-checker", redis);

//process jobs
queue.process(async (job: any) => {
  //console.log('---------------- job is processing --------------');

  await addJob(job.data);
});

// git clone https://dlakes@bitbucket.org/dlakes/lottos.git

const options = {
  delay: 100,
  attempts: 1,
};

const processJob = async (data: any) => {
  //Add queue
  queue.add(data, options);
};

const addJob = async (data: any) => {
  //   console.log({ data });

  let drone = await db.Drones.findOne({
    where: {
      uuid: data.uuid,
    },
  });

  await db.BatteryAudit.create({
    uuid: util.uuid(),
    drone_id: drone.id,
    battery_level: drone.battery_capacity,
  });

  return;
};

module.exports = {
  processJob,
};
