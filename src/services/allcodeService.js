import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

export const handleGetDataAllCode = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Allcodes.findAll({
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (res && res.length > 0) {
        resolve({
          results: res,
        });
      }
      resolve({
        results: [],
      });
    } catch (e) {
      reject(e);
    }
  });
};