const userCheck = (req, res, next) => {
  const rol = "generic";
  const username = req.body?.username;
  const pass = req.body?.password;
  const passConfirm = req.body?.passwordConfirm;

  if (pass !== passConfirm)
    return res.json({ error: "Password does not match password confirmation" });

  if (!username || !pass || !rol) {
    return res.json({
      error: "some required field is missing",
    });
  }

  next();
};

export default userCheck;
