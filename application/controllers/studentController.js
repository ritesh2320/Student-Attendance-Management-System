const studentModel = require("../models/studentModel.js")

const studentController = {
  getStudentDashboard: (req, res, next) => {
    try {
      console.log("student login ")
      res.render("students/student-dashboard.ejs", {
        loggedInYear: JSON.stringify(req.session.userName),
        s_name: JSON.stringify(req.session.s_name),
      })
    } catch (error) {
      console.log(error)
    }
  },

  getSubjectsList: async (req, res, next) => {
    try {
      let _res = await studentModel.studentSubjects(req.body.studentId)
      return res.status(200).json({
        success: true,
        status: 200,
        data: _res[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
  attPercentage: async (req, res, next) => {
    try {
      let _res = await studentModel.attPercentage(req.body)
      console.log(_res, "percentage ====")
      return res.status(200).json({
        success: true,
        status: 200,
        data: _res[0].length >= 1 ? _res[0] : [],
      })
    } catch (error) {
      console.log(error)
    }
  },

  getAttendanceData: async (req, res, next) => {
    try {
      let _res = await studentModel.getAttendanceData(req.body)
      return res.status(200).json({
        success: true,
        status: 200,
        data: _res[0].length >= 1 ? _res[0] : [],
      })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = studentController
