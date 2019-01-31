import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "select gc.Name, gc.Description, bg1.Name as Gene1, bg2.Name as Gene2, bg3.Name as Gene3, bg4.Name as Gene4, bg5.Name as Gene5, bg6.Name as Gene6, gc.URL from genecombos gc left join basicgenetics bg1 on bg1.id = gc.Gene1 left join basicgenetics bg2 on bg2.id = gc.Gene2 left join basicgenetics bg3 on bg3.id = gc.Gene3 left join basicgenetics bg4 on bg4.id = gc.Gene4 left join basicgenetics bg5 on bg5.id = gc.Gene5 left join basicgenetics bg6 on bg6.id = gc.Gene6;",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const one = async (Name: string) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `select gc.Name, gc.Description, bg1.Name as Gene1, bg2.Name as Gene2, bg3.Name as Gene3, bg4.Name as Gene4, bg5.Name as Gene5, bg6.Name as Gene6, gc.URL from genecombos gc left join basicgenetics bg1 on bg1.id = gc.Gene1 left join basicgenetics bg2 on bg2.id = gc.Gene2 left join basicgenetics bg3 on bg3.id = gc.Gene3 left join basicgenetics bg4 on bg4.id = gc.Gene4 left join basicgenetics bg5 on bg5.id = gc.Gene5 left join basicgenetics bg6 on bg6.id = gc.Gene6 WHERE gc.Name = ?`,
      [Name],
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
