module.exports.authorize = (roles) => {
    return (req, res, next) => {
      const role = req.session.user.role;
  
      if (!role) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (!roles.includes(role)) {
        return res.status(403).render("error",{ message: 'Forbidden' });
      }
  
      next();
    };
  };

