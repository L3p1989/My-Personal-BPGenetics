import * as express from "express";

import DB from "./db";

const router = express.Router();

router.get("/api/hello", (req, res, next) => {
  res.json("World");
});

router.get("/api/morphs", async (req, res) => {
  try {
    let geneCombos = await DB.geneCombos.all();
    res.json(geneCombos);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/morphs/:Name", async (req, res) => {
  try {
    let geneCombos = await DB.geneCombos.one(req.params.Name);
    res.json(geneCombos);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
