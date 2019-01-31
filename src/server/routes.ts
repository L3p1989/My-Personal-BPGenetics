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

router.get("/api/genetypes", async (req, res) => {
  try {
    let geneTypes = await DB.geneTypes.all();
    res.json(geneTypes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/genetypes/:ID", async (req, res) => {
  try {
    let geneTypes = await DB.geneTypes.one(req.params.ID);
    res.json(geneTypes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/basicmorphs", async (req, res) => {
  try {
    let basicGenetics = await DB.basicGenetics.all();
    res.json(basicGenetics);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/basicmorphs/:ID", async (req, res) => {
  try {
    let basicGenetics = await DB.basicGenetics.one(req.params.ID);
    res.json(basicGenetics);
  } catch (e) {
    console.log(e);
    res.sendStatus(e);
  }
});

export default router;
