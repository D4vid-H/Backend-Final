const productCheck = (req, res, next) => {
  let name = req.body?.name;
  let price = req.body?.price;
  let description = req.body?.description;

  if (!name || !price || !description ) {
    return res.json({
      error: "some required field is missing",
    });
  }

  next();
};

export default productCheck;
