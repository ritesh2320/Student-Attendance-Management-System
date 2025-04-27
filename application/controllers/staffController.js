const staffModel = require("../models/staffModel.js")
const staffController = {
  getStaffDashboard: (req, res, next) => {
    try {
      res.render("staff/staff-dashboard.ejs", {
        loggedInYear: JSON.stringify(req.session.userName),
      })
    } catch (error) {
      console.log(error)
    }
  },

  saveStudentData: async (req, res, next) => {
    try {
      let _saveDataResponse = await staffModel.saveStudentData(req.body)
      if (_saveDataResponse[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 201,
          message: "Student added succesfully.",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getStudentsList: async (req, res, next) => {
    try {
      let year = req.query.year
      let department = req.query.department

      console.log(year, department, "-students list")

      let _studentsListResponse = await staffModel.getStudentsList(
        department,
        year
      )
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Students list",
        data: _studentsListResponse[0],
      })
    } catch (error) {
      console.log(error)
    }
  },

  deleteStudent: async (req, res, next) => {
    try {
      let _studentDeleteRes = await staffModel.deleteStudent(req.body.deleteId)
      if (_studentDeleteRes[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Deleted Student Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getSubList: async (req, res, next) => {
    try {
      console.log(req.query, "-query")
      let year = req.query.year
      let department = req.query.department
      console.log(department, "-department")
      let _subListRes = await staffModel.getSubList(year, department)
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Subjects List",
        data: _subListRes[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
  addSubject: async (req, res, next) => {
    try {
      let data = req.body
      let _addSubResponse = await staffModel.addSubject(data)
      if (_addSubResponse[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Added Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  deleteSubject: async (req, res, next) => {
    try {
      let _deleteSubRes = await staffModel.deleteSubject(req.body.deleteId)
      if (_deleteSubRes[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 200,
          message: "Deleted Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  saveAttendance: async (req, res, next) => {
    try {
      if (req.body.isEditAttendance) {
        await staffModel.deleteOldRecords(req.body.sendData)
      }
      let _response = await staffModel.saveAttendance(req.body.sendData)
      return res.status(201).json({
        success: true,
        status: 201,
        message: "Successfully Saved Attendance",
      })
    } catch (error) {
      console.log(error)
    }
  },

  checkAttFilled: async (req, res, next) => {
    try {
      let _isFilled = await staffModel._isFilled(req.body)
      let _response = await staffModel.checkAttFilled(req.body)
      console.log(_response[0], "-this--")
      if (_response[0].length >= 1) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Attendance filled already",
          attendanceFilled: _isFilled[0].length >= 1 ? 1 : 0,
          data: _response[0],
        })
      } else {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Attendance Not filled already",
          attendanceFilled: _isFilled[0].length >= 1 ? 1 : 0,
          data: {},
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  deletePreviousAtt: async (req, res, next) => {
    try {
      let _res = await staffModel.deletePreviousAtt(req.body)
      console.log(_res, "-delete-previous-attendance response ")
      if (_res[0].affectedRows >= 1) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Deleted attendance successful",
        })
      } else {
        return res.status(200).json({
          success: false,
          status: 400,
          message: "Deleted attendance unsuccessful",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  attReportMonthly: async (req, res, next) => {
    try {
      let _res = await staffModel.attReportMonthly(req.body)
      console.log(_res[0], "-here")
      return res.status(200).json({
        success: true,
        status: 200,
        data: _res[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = staffController
