const express = require("express");
const path = require("path");
const { Dishes } = require("../../config");
const routes = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("images/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });
routes.get("/", async (req, res) => {
  const result = await Dishes.get();
  const list = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

routes.post("/create", upload.single("file"), async (req, res) => {
  if (req.file) {
    await Dishes.add({ ...req.body, file: req.file.filename });
  } else {
    await Dishes.add({ ...req.body, file: "" });
  }
  res.send({ msg: "Dish added successfully." });
});
routes.put("/update/:Dishes_id", upload.single("file"), async (req, res) => {
  const id = req.params.Dishes_id;
  console.log(req);
  delete req.body.id;
  if (req.file) {
    await Dishes.doc(id).update({ ...req.body, file: req.file.filename });
  } else {
    await Dishes.doc(id).update(req.body);
  }
  res.send({ msg: "Dish updated successfully." });
});
routes.delete("/delete/:Dishes_id", async (req, res) => {
  const id = req.params.Dishes_id;
  await Dishes.doc(id).delete();
  res.send({ msg: "Dish deleted successfully." });
});
module.exports = routes;
