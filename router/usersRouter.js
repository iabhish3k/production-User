const router = require("express").Router();

const {
  createNew,
  getNew,
  putNew,
  deleteMultipleNews,
} = require("../controller/userController");

router.route("/user").post(createNew).get(getNew);

router.route("/user/:id").put(putNew);

router.post("/deletemultiple", deleteMultipleNews);

module.exports = router;
