import "dotenv/config";

const isAdmin = (req, res, next) => {
  if (req.session.passport?.user?.rol !== "admin") {
    return res.redirect(`/home`);
  }

  next();
};

export default isAdmin;
