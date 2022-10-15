const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const contactRouter = require("./app/route/contact.route.js");
const PhongRouter = require("./app/route/phong.route.js");
const TKRouter = require("./app/route/taikhoan.route.js")
app.use(cors());
app.use(express.json());
app.use("/api/NhanVien", contactRouter);
app.use("/api/Phong", PhongRouter);
app.use("/api/TaiKhoan", TKRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use((req, res, next) => {

    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {

    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
       
    });
});

module.exports = app;