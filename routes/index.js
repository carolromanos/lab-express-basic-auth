const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/auth", (req, res, next) => {
  res.render("");
});

module.exports = router;
