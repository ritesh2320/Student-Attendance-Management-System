console.log("Common js loaded")

function showEl(elements) {
  elements.forEach(el => {
    document.querySelectorAll(`${el}`).forEach(el => {
      el.classList.remove("hidden")
    })

    // document.querySelectorAll(`${el}`).classList.add("hidden")
  })
}

function hideEl(elements) {
  elements.forEach(el => {
    document.querySelectorAll(`${el}`).forEach(el => {
      el.classList.add("hidden")
    })

    // document.querySelectorAll(`${el}`).classList.add("hidden")
  })
}

function toast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    position: "center",
    stopOnFocus: "true",
  }).showToast()
}
