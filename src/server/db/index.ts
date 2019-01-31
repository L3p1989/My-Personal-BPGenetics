import * as mysql from "mysql";
import config from "../config";

import geneCombos from "./genecombos";

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
  if (err) console.log(err);
});

export default {
  geneCombos
};
