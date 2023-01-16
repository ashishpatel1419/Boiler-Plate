const jwt = require("jsonwebtoken");

const generateAuthToken = (req, res, next) => {
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30000000),
  });
  next();
};

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token == undefined) {
      return res.redirect("/");
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  generateAuthToken,
  auth,
};
