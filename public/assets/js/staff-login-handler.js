window.addEventListener("DOMContentLoaded", () => {
  let loginForm = document.querySelector("#staff-login-form")
  let loginType

  Toastify({
    text: "Welcome!!!",
    duration: 3000,
    position: "center",
  }).showToast()

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let userName = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let isAdminType = document.querySelector("#admin-login").checked
    let isStudentType = document.querySelector("#std-login").checked

    loginType = isAdminType ? "admin" : isStudentType ? "student" : null

    if (!userName || !password || !loginType) return showInvalidLoginDetails()

    getStaffLogin(userName, password, loginType)
  })

  async function getStaffLogin(userName, password, loginType) {
    let _response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, loginType }),
    })

    let _data = await _response.json()

    if (!_data.success) return showInvalidLoginDetails()

    if (_data.success) {
      if (loginType == "admin") {
        window.location.assign("/staff/dashboard")
      }
      if (loginType == "student") {
        window.location.assign("/student/dashboard")
      }
    } 

    if (!_data.success) {
      showInvalidLoginDetails()
    }
  }

  function showInvalidLoginDetails() {
    Toastify({
      text: "Invalid Login Details",
      duration: 3000,
      position: "center",
    }).showToast()
  }
})
