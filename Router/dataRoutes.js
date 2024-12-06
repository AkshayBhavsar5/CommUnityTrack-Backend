const {
  addData,
  editData,
  getAllData,
} = require("../Controller/dataController.js");

const router = require("express").Router();

router.route("/add").post(addData);
router.route("/edit/:id").put(editData);
router.route("/getalldata").get(getAllData);

module.exports = router;
