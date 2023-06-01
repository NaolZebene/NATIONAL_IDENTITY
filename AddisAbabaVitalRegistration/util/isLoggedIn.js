module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      // User is logged in
      next();
    } else {
      // User is not logged in, redirect to login page
      res.redirect('/login');
    }
  };