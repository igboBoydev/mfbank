export {};
const db = require("../database/mysql");
const utill = require("../utils/packages");
const sendError = (message: string) => {
  var error = {
    status: "ERROR",
    message,
  };

  return error;
};

const sendSuccess = (message: string) => {
  var success = {
    status: "SUCCESS",
    message,
  };

  return success;
};

const generateClientId = (length: number) => {
  var result = "";
  var characters = "123456789123456789123456789";
  var charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const generateSerialNum = (length: number) => {
  var result = "";
  var characters =
    "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789123456789";
  var charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const checForCharacter = (char: string): boolean => {
  let regex = /^(\w|\_|-)+$/;

  return regex.test(char);
};

const checkForUppercaseNumbers = (char: string): boolean => {
  let regex = /^[A-Z\d\W_]*$/;

  return regex.test(char);
};

const checkMail = async (req: any) => {
  return await db.Users.findOne({ where: { email: req.body.email } });
};

const apiData = (entry: any, message: string) => {
  const success = {
    status: "SUCCESS",
    data: entry,
    message,
  };

  return success;
};

const checkMobile = async (req: any) => {
  return await db.Users.findOne({
    where: { mobile_number: req.body.mobile },
  });
};

const checkPin = async (user_id: any, pin: string) => {
  let pinChecker = await db.TransactionPin.findOne({
    where: { user_id: user_id, pin },
  });

  return pinChecker;
};

const checkSpecialChr = async (item: string) => {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(item);
};

function hasWhiteSpace(s: string) {
  return /\s/g.test(s);
}

function checkNumber(n: string) {
  return /^\d+$/.test(n);
}

module.exports = {
  sendError,
  checkNumber,
  checkSpecialChr,
  checkPin,
  checkMail,
  generateSerialNum,
  checkForUppercaseNumbers,
  checkMobile,
  generateClientId,
  checForCharacter,
  apiData,
  sendSuccess,
};
