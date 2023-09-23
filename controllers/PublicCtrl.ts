import { Request, Response, NextFunction } from "express";
const utill = require("../utils/packages");
const { Op } = require("sequelize");
const db = require("../database/mysql");
const { paginate } = require("paginate-info");
const { addDroneSchema, addMedicationSchema } = require("../utils/schemas");

module.exports = {
  // service to add drones
  addDrone: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const validateResult = addDroneSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    const { model, weight, battery_capacity, state } = req.body;

    let serial_number = utill.helpers.generateSerialNum(100);

    await db.Drones.create({
      uuid: utill.uuid(),
      serial_num: serial_number,
      model,
      availabile_weight: weight,
      weight,
      battery_capacity: battery_capacity,
      state,
    });

    return res
      .status(200)
      .json(utill.helpers.sendSuccess("Drone added successfully"));
  },

  // service to load a particular drone with medication items
  loadDroneWithMedications: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const validateResult = addMedicationSchema.validate(req.body);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    const { drone_uuid, name, weight, code, image } = req.body;

    let nameChecker = utill.helpers.checForCharacter(name);
    let codeChecker = utill.helpers.checkForUppercaseNumbers(code);
    let droneChecker = await db.Drones.findOne({ where: { uuid: drone_uuid } });

    console.log({ nameChecker, codeChecker });

    if (!droneChecker) {
      return res
        .status(400)
        .json(utill.helpers.sendError("Drone with unique id not found"));
    }

    if (!nameChecker) {
      return res
        .status(400)
        .json(
          utill.helpers.sendError(
            "Name can only contain letters, numbers, hyphens, and underscores"
          )
        );
    }

    if (!codeChecker) {
      return res
        .status(400)
        .json(
          utill.helpers.sendError(
            "code can only contain uppercase letters, numbers, and underscores"
          )
        );
    }

    if (droneChecker.battery_capacity < 25) {
      return res
        .status(400)
        .json(
          utill.helpers.sendError(
            "Cannot load drone while battery is below 25%"
          )
        );
    }

    let remaining_weight =
      parseFloat(droneChecker.availabile_weight) - parseFloat(weight);

    if (remaining_weight < 0) {
      return res
        .status(400)
        .json(
          utill.helpers.sendError(
            "Drone does not have enough weight to carry medication"
          )
        );
    }

    await db.Medications.create({
      uuid: utill.uuid(),
      name,
      weight,
      code,
      image,
      drone_id: droneChecker.id,
    });

    droneChecker.availabile_weight = remaining_weight;
    await droneChecker.save();

    return res
      .status(200)
      .json(utill.helpers.sendSuccess("Medication added successfully"));
  },

  // servcice to check for medication items i a particular drone in paginated order
  checkMedicationsInDrone: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { pageNum, drone_uuid } = req.query;

    if (!pageNum || isNaN(pageNum)) {
      return res
        .status(400)
        .json(utill.helpers.sendError("Kindly add a valid page number"));
    }

    var currentPage = parseInt(pageNum) ? parseInt(pageNum) : 1;

    var page = currentPage - 1;
    var pageSize = 25;
    const offset = page * pageSize;
    const limit = pageSize;

    let droneChecker = await db.Drones.findOne({ where: { uuid: drone_uuid } });

    if (!droneChecker) {
      return res
        .status(400)
        .json(utill.helpers.sendError("Drone with unique id not found"));
    }

    let allMedications = await db.Medications.findAndCountAll({
      offset: offset,
      limit: limit,
      where: { drone_id: droneChecker.id },
      order: [["id", "DESC"]],
    });

    var next_page = currentPage + 1;
    var prev_page = currentPage - 1;
    var nextP =
      `api/v1/mfbank/public/all-medications-in-drone?pageNum=` + next_page;
    var prevP =
      `api/v1/mfbank/public/all-medications-in-drone?pageNum=` + prev_page;

    const meta = paginate(
      currentPage,
      allMedications.count,
      allMedications.rows,
      pageSize
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: allMedications,
      per_page: pageSize,
      current_page: currentPage,
      last_page: meta.pageCount, //transactions.count,
      first_page_url: `api/v1/mfbank/public/all-medications-in-drone?pageNum=1`,
      last_page_url:
        `api/v1/mfbank/public/all-medications-in-drone?pageNum=` +
        meta.pageCount, //transactions.count,
      next_page_url: nextP,
      prev_page_url: prevP,
      path: `api/v1/mfbank/public/all-medications-in-drone?pageNum=`,
      from: 1,
      to: meta.pageCount, //transactions.count,
    });
  },

  // servcice to check for available drones
  getAvailableDrones: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { pageNum } = req.query;

    if (!pageNum || isNaN(pageNum)) {
      return res
        .status(400)
        .json(utill.helpers.sendError("Kindly add a valid page number"));
    }

    var currentPage = parseInt(pageNum) ? parseInt(pageNum) : 1;

    var page = currentPage - 1;
    var pageSize = 25;
    const offset = page * pageSize;
    const limit = pageSize;

    let allDrones = await db.Drones.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    var next_page = currentPage + 1;
    var prev_page = currentPage - 1;
    var nextP = `api/v1/mfbank/public/all-drones?pageNum=` + next_page;
    var prevP = `api/v1/mfbank/public/all-drones?pageNum=` + prev_page;

    const meta = paginate(
      currentPage,
      allDrones.count,
      allDrones.rows,
      pageSize
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: allDrones,
      per_page: pageSize,
      current_page: currentPage,
      last_page: meta.pageCount, //transactions.count,
      first_page_url: `api/v1/mfbank/public/all-drones?pageNum=1`,
      last_page_url:
        `api/v1/mfbank/public/all-drones?pageNum=` + meta.pageCount, //transactions.count,
      next_page_url: nextP,
      prev_page_url: prevP,
      path: `api/v1/mfbank/public/all-drones?pageNum=`,
      from: 1,
      to: meta.pageCount, //transactions.count,
    });
  },

  // serviceto get drone batter information
  getDroneBatteryLevel: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { drone_uuid } = req.query;

    let drone = await db.Drones.findOne({ where: { uuid: drone_uuid } });

    if (!drone) {
      return res
        .status(400)
        .json(utill.helpers.sendError("Drone with id not found"));
    }

    return res
      .status(200)
      .json({ status: "SUCCESS", battery_level: drone.battery_capacity + "%" });
  },
};
