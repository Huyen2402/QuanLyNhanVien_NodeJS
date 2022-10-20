const express = require("express");
const cv = require("../controller/chucvu.controller");
const router3 = express.Router();

router3.route("/")
    .get(cv.findAll)
    .post(cv.create)
    .delete(cv.deleteAll)
    router3.route("/favorite")
    .get(cv.findAllFavorite)
    router3.route("/:id")
    .get(cv.findOne)
    .put(cv.update)
    .delete(cv.delete)

module.exports = router3;
