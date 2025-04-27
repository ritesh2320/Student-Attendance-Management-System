window.addEventListener("DOMContentLoaded", () => {
  console.log("student-dashboard-handler.js loaded")
  let subject = document.querySelector("#subject")
  let date = document.querySelector(".date")
  let searchAttBtn = document.querySelector(".search-att-btn")
  let searchAttPercentageBtn = document.querySelector(".search-att-percentage")
  let stdAttTbody = document.querySelector(".std-att-tbody")

  document.querySelector(".student-name").innerText = s_name
  // setTodaysDate()
  getSubjectsList(studentId)
  getStudentsAttPercentage(studentId)

  // function setTodaysDate() {
  //   let d = new Date()

  //   date.value = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
  // }

  async function getSubjectsList(studentId) {
    let _res = await fetch("/student/subjects-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })

    let _data = await _res.json()

    console.log(_data)

    renderStudentSubjects(_data.data[0].subjects)
  }

  function renderStudentSubjects(subjects) {
    let _html = subjects
      .map(sub => {
        return `<option value='${sub}'>${sub}</option>`
      })
      .join("")
    subject.innerHTML = `<option value=''>-- Select Subject --</option>` + _html
  }

  searchAttBtn.addEventListener("click", async function () {
    let _subject = subject.value
    let _date = date.value

    console.log(_subject, _date)
    let _response = await fetch("/student/get-attendance-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _subject, _date, studentId }),
    })

    let _data = await _response.json()
    console.log(_data, "this")
    printStudentAttendance(_data.data)
  })

  function printStudentAttendance(attendanceList) {
    let _html
    if (attendanceList.length == 0)
      _html = `<tr class='text-center'><td colspan='5'>No Data Found</td></tr>`
    else
      _html = attendanceList
        .map((el, i) => {
          return `
            <tr>
              <td>${i + 1}</td>
              <td>${el.subject}</td>
              <td>${el.date.split("T")[0]}</td>
              <td>${el.status == 1 ? "Present" : "Absent"}</td>
            </tr>`
        })
        .join("")

    stdAttTbody.innerHTML = _html
  }

  function renderMonthsDropdown() {
    let p_month = document.querySelector("#p_month")
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let _html = months.map(el => `<option value=${el}>${el}</option>`)
    p_month.innerHTML = _html
  }
  renderMonthsDropdown()

  searchAttPercentageBtn.addEventListener("click", getStudentsAttPercentage)

  let _month = document.querySelector("#p_month")
  async function getStudentsAttPercentage() {
    let _res = await fetch("/student/att-percentage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, month: _month.value }),
    })

    let _data = await _res.json()

    console.log(_data)
    printAttPercentageTable(_data.data)
  }

  function printAttPercentageTable(list) {
    let tbody = document.querySelector(".std-att-per-tbody")
    let _html
    if (list.length == 0)
      _html = `<tr class='text-center'><td colspan='5'>No Data Found</td></tr>`
    else
      _html = list
        .map((el, i) => {
          let percentage = (
            (el.presentDays /
              new Date(new Date().getFullYear(), _month.value, 0).getDate()) *
            100
          ).toFixed(2)
          return `
            <tr>
              <th>${i + 1}</th>
              <th>${el.subject}</th>
              <th>${percentage}%</th>
            </tr>`
        })
        .join("")

    tbody.innerHTML = _html
  }
})
