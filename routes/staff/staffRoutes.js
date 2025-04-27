const express = require("express")

const router = express.Router()
const staffController = require("../../application/controllers/staffController.js")

const isAuth = require("../middlewares/isAuth.js")

router.get("/dashboard", isAuth, staffController.getStaffDashboard)

router.post("/save-student", isAuth, staffController.saveStudentData)

router.get("/students-list", isAuth, staffController.getStudentsList)

router.delete("/delete-student", isAuth, staffController.deleteStudent)

router.get("/subject-list", isAuth, staffController.getSubList)
router.post("/add-subject", isAuth, staffController.addSubject)
router.delete("/delete-subject", isAuth, staffController.deleteSubject)

// attendance
router.post("/save-attendance", staffController.saveAttendance)
router.post("/check-att-filled", staffController.checkAttFilled)

router.delete('/delete-previous-attendance', staffController.deletePreviousAtt)

router.post('/att-report-monthly', staffController.attReportMonthly)

module.exports = router
