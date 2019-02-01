import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT gc.Name, gc.Description, gt1.Name AS GeneType1, bg1.Name AS Gene1, gt2.Name AS GeneType2, bg2.Name AS Gene2, gt3.Name AS GeneType3, bg3.Name AS Gene3, gt4.Name AS GeneType4, bg4.Name AS Gene4, gt5.Name AS GeneType5, bg5.Name AS Gene5, gt6.Name AS GeneType6, bg6.Name AS Gene6, gc.URL FROM genecombos gc LEFT JOIN basicgenetics bg1 ON bg1.ID = gc.Gene1 LEFT JOIN basicgenetics bg2 ON bg2.ID = gc.Gene2 LEFT JOIN basicgenetics bg3 ON bg3.ID = gc.Gene3 LEFT JOIN basicgenetics bg4 ON bg4.ID = gc.Gene4 LEFT JOIN basicgenetics bg5 ON bg5.ID = gc.Gene5 LEFT JOIN basicgenetics bg6 ON bg6.ID = gc.Gene6 LEFT JOIN genetypes gt1 ON gt1.ID = bg1.GeneType LEFT JOIN genetypes gt2 ON gt2.ID = bg2.GeneType LEFT JOIN genetypes gt3 ON gt3.ID = bg3.GeneType LEFT JOIN genetypes gt4 ON gt4.ID = bg4.GeneType LEFT JOIN genetypes gt5 ON gt5.ID = bg5.Genetype LEFT JOIN genetypes gt6 ON gt6.ID = bg6.GeneType;",
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
      `SELECT gc.Name, gc.Description, gt1.Name AS GeneType1, bg1.Name AS Gene1, gt2.Name AS GeneType2, bg2.Name AS Gene2, gt3.Name AS GeneType3, bg3.Name AS Gene3, gt4.Name AS GeneType4, bg4.Name AS Gene4, gt5.Name AS GeneType5, bg5.Name AS Gene5, gt6.Name AS GeneType6, bg6.Name AS Gene6, gc.URL FROM genecombos gc LEFT JOIN basicgenetics bg1 ON bg1.ID = gc.Gene1 LEFT JOIN basicgenetics bg2 ON bg2.ID = gc.Gene2 LEFT JOIN basicgenetics bg3 ON bg3.ID = gc.Gene3 LEFT JOIN basicgenetics bg4 ON bg4.ID = gc.Gene4 LEFT JOIN basicgenetics bg5 ON bg5.ID = gc.Gene5 LEFT JOIN basicgenetics bg6 ON bg6.ID = gc.Gene6 LEFT JOIN genetypes gt1 ON gt1.ID = bg1.GeneType LEFT JOIN genetypes gt2 ON gt2.ID = bg2.GeneType LEFT JOIN genetypes gt3 ON gt3.ID = bg3.GeneType LEFT JOIN genetypes gt4 ON gt4.ID = bg4.GeneType LEFT JOIN genetypes gt5 ON gt5.ID = bg5.Genetype LEFT JOIN genetypes gt6 ON gt6.ID = bg6.GeneType WHERE gc.Name = ?`,
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
