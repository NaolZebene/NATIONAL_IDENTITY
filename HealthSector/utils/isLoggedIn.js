module.exports.isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/login'); // Replace '/login' with your login route
    }
  };

  
