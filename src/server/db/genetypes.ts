import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("select * from genetypes", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const one = async (ID: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `select * from genetypes WHERE ID = ?`,
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
