const usermodel = require("../models/user_model");
const bcrypt = require("bcrypt");
const {
  validateForm,
  validateLogin,
  verifyEmail,
  newPassword,
  resetPassword,
  validateUpdateProfile,
} = require("../validation/userValidation");
const { sendOTP } = require("../services/mail");
const otp = Math.floor(100000 + Math.random() * 900000);

exports.index = (req, res) => {
  return res.render("index");
};
exports.register = (req, res) => {
  return res.render("registration", {
    values: req.body
  });
};

exports.authregister = async (req, res) => {
  try {
    const { error } = validateForm(req.body);
    if (error) {
      if (error.details[0].context.key == "fname") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "lname") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "gender") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "hobby") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "mobileno") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error5: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error6: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error7: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "cpassword") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error8: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "city") {
        var err1 = error.details[0].message;
        res.render("registration", {
          error9: err1,
          values: req.body,
        });
      }
      
    } else {
      let user = await usermodel.findOne({ email: req.body.email });
      if (user) {
        var err1 = "User Already Register";
        return res.render("register", {
          error: err1,
          values: req.body,
        });
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        password: req.body.password,
        uploadImage: req.file.filename,
        city: req.body.city,
        hobby: req.body.hobby,
      };
      const userData = new usermodel(data);
      userData.save().then((data) => {
        res.redirect("/");
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = (req, res) => {
  return res.render("login");
};

exports.authlogin = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        res.render("login", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        res.render("login", {
          error2: err1,
          values: req.body,
        });
      }
    } else {
      let user = await usermodel.findOne({ email: req.body.email });

      if (user) {
        const password = req.body.password;
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          res.redirect("/index");
        } else {
          return res.status(400).send("Password does not match");
        }
      } else {
        return res.status(404).send("User is not found");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.forgetPass = async (req, res) => {
  return res.render("ForgetPassword");
};

exports.verifyEmail = async (req, res) => {
  try {
    const { error } = verifyEmail(req.body);
    if (error) {
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        res.render("ForgetPassword", {
          error1: err1,
          values: req.body,
        });
      }
    } else {
      let user = await usermodel.findOne({ email: req.body.email });

      if (user) {
        sendOTP(req.body.email, otp);
        res.render("otp", {
          email: req.body.email,
        });
      } else {
        res.status(404).send("User is not found");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.otp = async (req, res) => {
  return res.render("otp");
};

exports.verifyOtp = async (req, res) => {
  try {
    if (otp == req.body.otp) {
      res.render("updatePassword", {
        email: req.body.email,
      });
    } else {
      res.status(400).send("Please enter valid OTP");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { error } = newPassword(req.body);
    if (error) {
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        res.render("updatePassword", {
          error1: err1,
          email: req.body.email,
        });
      }
      if (error.details[0].context.key == "cpassword") {
        var err1 = error.details[0].message;
        res.render("updatePassword", {
          error2: err1,
          email: req.body.email,
        });
      }
    } else {
      const salt = 10;
      const bcryptPassword = await bcrypt.hash(req.body.password, salt);

      const passwordUpdate = { password: bcryptPassword };

      usermodel.updateOne(
        { email: req.body.email },
        passwordUpdate,
        (err, response) => {
          if (response) {
            res.redirect("/");
          } else {
            console.log(err);
          }
        }
      );
    }
  } catch (err) {
    console.error("Error", err);
  }
};

exports.viewProfile = async (req, res) => {
  const email = req.user.email;

  try {
    const user = await usermodel.findOne({ email });
    if (user) {
      res.render("viewProfile", {
        values: user,
      });
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.updateProfile = async (req, res) => {
  const email = req.user.email;

  usermodel.findOne({ email: email }, (err, data) => {
    if (err) {
      logger.error(err);
    } else {
      res.render("editprofile", {
        user: data,
      });
    }
  });
};

exports.editProfile = async (req, res) => {
  try {
    const { error } = validateUpdateProfile(req.body);

   if (error) {
     if (error.details[0].context.key == "fname") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error1: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "lname") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error2: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "gender") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error3: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "hobby") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error4: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "mobileno") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error5: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "email") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error6: err1,
         user: req.body,
       });
     }
     if (error.details[0].context.key == "city") {
       var err1 = error.details[0].message;
       res.render("editprofile", {
         error7: err1,
         user: req.body,
       });
     }
   } else {
     const email = req.user.email;
     let updateuser = await usermodel.findOneAndUpdate(
       { email: email },
       {
         fname: req.body.fname,
         lname: req.body.lname,
         email: req.body.email,
         gender: req.body.gender,
         mobileno: req.body.mobileno,
         city: req.body.city,
         hobby: req.body.hobby,
       }
     );
     if (req.file) {
       updateuser = await usermodel.findOneAndUpdate(
         { email: email },
         {
           uploadImage: req.file.filename,
         }
       );
     }
     if (updateuser)
       res.render("viewProfile", {
         values: req.body,
       });
   }
  } catch (error) {
    console.error(error);
  }
};

exports.resetPassword = (req, res) => {
  res.render("resetPassword", {
    values: req.body,
    email: req.user.email,
  });
};

exports.newPassword = async (req, res) => {
  try {
    const { error } = resetPassword(req.body);
    if (error) {
      if (error.details[0].context.key == "currentpassword") {
        var err1 = error.details[0].message;
        res.render("resetPassword", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "newpassword") {
        var err1 = error.details[0].message;
        res.render("resetPassword", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "confirmpassword") {
        var err1 = error.details[0].message;
        res.render("resetPassword", {
          error3: err1,
          values: req.body,
        });
      }
    } else {
      const email = req.user.email;
      const user = await usermodel.findOne({ email });
      if (user) {
        const passwordValid = await bcrypt.compare(
          req.body.currentpassword,
          user.password
        );

        if (passwordValid) {
          const salt = 10;
          const bcryptPassword = await bcrypt.hash(req.body.newpassword, salt);

          const passwordUpdate = { password: bcryptPassword };

          usermodel.updateOne(
            { email },
            passwordUpdate,
            async (err, response) => {
              if (response) {
                res.redirect("/");
              } else {
                logger.log(err);
              }
            }
          );
        } else {
          return res.render("resetPassword", {
            error: "Current Password is incorrect",
          });
        }
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.redirect("/");
  } catch (err) {
    logger.error(err);
  }
};