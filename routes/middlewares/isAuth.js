const isAuth = (req, res, next) => {
  if (!req.session.userName || !req.session.password) {
    return res.redirect("/login-page")
  } else {
    next()
  }
}

module.exports = isAuth
