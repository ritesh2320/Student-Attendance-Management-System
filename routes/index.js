const express = require("express")
const router = express.Router()

const studentRouter = require("./students/studentRoutes.js")
const staffRouter = require("./staff/staffRoutes.js")
const staffModel = require("../application/models/staffModel.js")

router.use("/student", studentRouter)
router.use("/staff", staffRouter)

router.get("/login-page", (req, res, next) => {
  try {
    if (req.session.userName && req.session.password)
      return res.redirect("/staff/dashboard")
    res.render("login.ejs")
  } catch (error) {
    console.log(error)
  }
})

router.get("/logout", (req, res, next) => {
  req.session.destroy()
  res.redirect("/login-page")
})

// user authentication
router.post("/login", async (req, res, next) => {
  try {
    let loginType = req.body.loginType
    let _loginDetails
    if (loginType == "admin") {
      _loginDetails = await staffModel.loginStaff(req.body)
    }
    if (loginType == "student") {
      _loginDetails = await staffModel.loginStudent(req.body)
    }

    console.log(_loginDetails, "-login details")

    if (_loginDetails[0].length == 0) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Unauthorized",
      })
    }

    if (_loginDetails[0].length >= 1) {
      req.session.userName = _loginDetails[0][0].username
      req.session.password = _loginDetails[0][0].password

      if (loginType == "student") {
        req.session.s_name = _loginDetails[0][0].s_name
      }

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Authorized",
      })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
