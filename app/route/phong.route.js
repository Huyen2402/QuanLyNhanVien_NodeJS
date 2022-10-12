const express = require("express");
const phongs = require("../controller/phong.controller");
const router1 = express.Router();

router1.route("/")
    .get(phongs.findAll)
    .post(phongs.create)
    .delete(phongs.deleteAll)
router1.route("/favorite")
    .get(phongs.findAllFavorite)
router1.route("/:id")
    .get(phongs.findOne)
    .put(phongs.update)
    .delete(phongs.delete)

module.exports = router1;
