const express = require("express")
const isAuth = require("../middlewares/isAuth")
const studentController = require("../../application/controllers/studentController")

const router = express.Router()

router.get("/dashboard", isAuth, studentController.getStudentDashboard)

router.post('/subjects-list', isAuth, studentController.getSubjectsList)
router.post('/att-percentage', isAuth, studentController.attPercentage)

router.post('/get-attendance-data', isAuth, studentController.getAttendanceData)

module.exports = router
