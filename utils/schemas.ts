const util = require("../utils/packages");

export const option = {
  abortEarly: false,
  // allowUnknown: true,
  // stripUnknown: true,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const addDroneSchema = util.Joi.object()
  .keys({
    model: util.Joi.string().required(),
    weight: util.Joi.number().required(),
    battery_capacity: util.Joi.number().required(),
    state: util.Joi.string().uppercase().required(),
  })
  .unknown();

export const addMedicationSchema = util.Joi.object()
  .keys({
    drone_uuid: util.Joi.string().required(),
    name: util.Joi.string().required(),
    weight: util.Joi.number().required(),
    code: util.Joi.string().required(),
    image: util.Joi.string().required(),
  })
  .unknown();
