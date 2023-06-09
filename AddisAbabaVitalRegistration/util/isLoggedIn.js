module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      // User is not logged in, redirect to login page
      res.redirect('/login');
    }
  };