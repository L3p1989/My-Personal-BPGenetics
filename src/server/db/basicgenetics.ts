import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "select bg.ID, bg.Name, gt.Name as GeneType from basicgenetics bg join genetypes gt on gt.ID = bg.GeneType;",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const one = async (ID: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `select bg.ID, bg.Name, gt.Name as GeneType from basicgenetics bg join genetypes gt on gt.ID = bg.GeneType WHERE ID = ?`,
      [ID],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export default {
  all,
  one
};
