
const isNotLogin = (req, res, next) => {
  const username = req.session?.passport?.user.username
    if (!username) {
      return next();
    }
    return res.redirect(`/home`);
  };
  
  export default isNotLogin;