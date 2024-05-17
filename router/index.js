const router = require("express").Router();

const newRouter = require("./usersRouter");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Test",
  });
});

router.use("/api/v1", newRouter);

module.exports = router;
