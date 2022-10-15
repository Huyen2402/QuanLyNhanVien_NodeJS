const express = require("express");
const tk = require("../controller/taikhoan.controller");
const router2 = express.Router();

router2.route("/")
    .get(tk.findAll)
    .post(tk.create)
    .delete(tk.deleteAll)
router2.route("/favorite")
    .get(tk.findAllFavorite)
router2.route("/:id")
    .get(tk.findOne)
    .put(tk.update)
    .delete(tk.delete)
router2.route("/login")
    .post(tk.login)
module.exports = router2;
