const db = require("../config/db-connect.js")
const studentModel = {
  studentSubjects: studentId => {
    return db.execute(`
                    SELECT 
                    stds.s_name,
                    stds.id AS username,
                    stds.s_mobile AS password,
                    stds.s_department,
                    stds.s_year,
                    JSON_ARRAYAGG(sub_name) AS subjects
                FROM
                    students AS stds
                        JOIN
                    subjects AS subs
                WHERE
                    stds.id = ${studentId} AND stds.s_year = subs.sub_year AND stds.s_department = subs.sub_department
                LIMIT 1`)
  },

  attPercentage: ({ studentId, month }) => {
    // prettier-ignore
    let query = `SELECT 
                    att.subject,
                    count(date) AS presentDays
                FROM
                    attendance as att
                WHERE
                    att.student_id = ${studentId} AND DATE_FORMAT(att.date,'%m') = ${month} 
                GROUP BY att.subject;`
    return db.execute(query)
  },

  getAttendanceData: ({ _subject, _date, studentId }) => {
    console.log(_subject, _date, studentId)
    let query = `
                SELECT 
                *
            FROM
                attendance
            WHERE
                student_id = ${studentId} AND date = '${_date}' AND subject = '${_subject}';`
    return db.execute(query)
  },
}

module.exports = studentModel
