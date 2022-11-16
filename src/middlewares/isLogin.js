
const isLogin = (req, res, next) => {
  const username = req.session?.passport?.user.username
    if (username) return next();

    return res.redirect(`/login`);
  
  };
  
  export default isLogin;