const Joi = require("@hapi/joi");

function validateForm(register) {
  const schema = Joi.object({
    fname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `First Name should be a type of text`,
      "string.min": `First Name should be a 3 Character '`,
      "string.max": `First Name should be a 30 Character '`,
      "string.empty": "First Name is not allowed to be empty",
      "any.required": `First Name is Required`,
    }),
    lname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `Last Name should be a type of text`,
      "string.min": `Last Name should be a 3 Character '`,
      "string.max": `Last Name should be a 30 Character '`,
      "string.empty": "Last Name is not allowed to be empty",
      "any.required": `Last Name is Required`,
    }),
    gender: Joi.string().empty().required().messages({
      "string.base": `Gender should be a type of text`,
      "string.empty": "Gender is not allowed to be empty",
      "any.required": `Gender is Required`,
    }),
    hobby: Joi.required().messages({
      "string.empty": `hobby cannot be an empty field`,
      "any.required": `hobby is a required field`,
    }),
    mobileno: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .empty()
      .required()
      .label("Phone No")
      .messages({
        "string.base": `Phone Number should be a type of text`,
        "string.pattern.base": `Enter only Numbers`,
        "string.length": `Phone Number length must be 10 characters long`,
        "string.empty": "Phone Number is not allowed to be empty",
        "string.required": `Phone Number is Required`,
      }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of text`,
      "string.empty": "Password is not allowed to be empty",
      "any.required": `Password is Required`,
      "string.password": `Password format not valid`,
    }),
    cpassword: Joi.string()
      .empty()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `Confirm Password should be a type of text`,
        "string.empty": "Confirm Password is not allowed to be empty",
        "string.required": `Confirm Password is Required`,
        "any.only": "Confirm Password doesn't match password",
      }),
    city: Joi.string().empty().required().messages({
      "string.base": `City should be a type of text`,
      "string.empty": "City  is not allowed to be empty",
      "string.required": `City is Required`,
    }),
  });

  return schema.validate(register, { abortEarly: false });
}

function validateLogin(login) {
  const schema = Joi.object({
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "any.required": `Email is Required`,
    }),
    password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of text`,
      "string.empty": "Password is not allowed to be empty",
      "any.required": `Password is Required`,
      "string.password": `Password format not valid`,
    }),
  });
  return schema.validate(login, { abortEarly: false });
}

function verifyEmail(req) {
  const schema = Joi.object({
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
  });
  return schema.validate(req, { abortEarly: false });
}

function newPassword(req) {
  const schema = Joi.object({
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "any.required": `Email is Required`,
    }),
    password: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of text`,
      "string.empty": "Password is not allowed to be empty",
      "string.required": `Password is Required`,
      "string.password": `Password format not valid`,
    }),
    cpassword: Joi.string()
      .empty()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.base": `Confirm Password should be a type of text`,
        "string.empty": "Confirm Password is not allowed to be empty",
        "string.required": `Confirm Password is Required`,
        "any.only": "Confirm Password doesn't match password",
      }),
  });
  return schema.validate(req, { abortEarly: false });
}

function validateUpdateProfile(req) {
  const schema = Joi.object({
    fname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `First Name should be a type of text`,
      "string.min": `First Name should be a 3 Character '`,
      "string.max": `First Name should be a 30 Character '`,
      "string.empty": "First Name is not allowed to be empty",
      "any.required": `First Name is Required`,
    }),
    lname: Joi.string().min(3).max(30).empty().required().messages({
      "string.base": `Last Name should be a type of text`,
      "string.min": `Last Name should be a 3 Character '`,
      "string.max": `Last Name should be a 30 Character '`,
      "string.empty": "Last Name is not allowed to be empty",
      "any.required": `Last Name is Required`,
    }),
    gender: Joi.string().empty().required().messages({
      "string.base": `Gender should be a type of text`,
      "string.empty": "Gender is not allowed to be empty",
      "string.required": `Gender is Required`,
    }),
    hobby: Joi.required().messages({
      "string.empty": `hobby cannot be an empty field`,
      "any.required": `hobby is a required field`,
    }),
    mobileno: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .empty()
      .required()
      .label("Phone No")
      .messages({
        "string.base": `Phone Number should be a type of text`,
        "string.pattern.base": `Enter only Numbers`,
        "string.length": `Phone Number length must be 10 characters long`,
        "string.empty": "Phone Number is not allowed to be empty",
        "any.required": `Phone Number is Required`,
      }),
    email: Joi.string().email().empty().required().label("Email").messages({
      "string.base": `Email should be a type of text`,
      "string.email": `Email format not valid`,
      "string.empty": "Email is not allowed to be empty",
      "string.required": `Email is Required`,
    }),
    city: Joi.string().empty().required().messages({
      "string.base": `City should be a type of text`,
      "string.empty": "City  is not allowed to be empty",
      "string.required": `City is Required`,
    }),
  });
  return schema.validate(req);
}

function resetPassword(req) {
  const schema = Joi.object({
    currentpassword: Joi.string().empty().required().messages({
      "string.base": `Current Password should be a type of text`,
      "string.empty": "Current Password is not allowed to be empty",
      "any.required": `Current Password is Required`,
      "string.password": `Current Password format not valid`,
    }),
    newpassword: Joi.string().empty().required().messages({
      "string.base": `Password should be a type of text`,
      "string.empty": "Password is not allowed to be empty",
      "any.required": `Password is Required`,
      "string.password": `Password format not valid`,
    }),
    confirmpassword: Joi.string()
      .empty()
      .required()
      .valid(Joi.ref("newpassword"))
      .messages({
        "string.base": `Confirm Password should be a type of text`,
        "string.empty": "Confirm Password is not allowed to be empty",
        "any.required": `Confirm Password is Required`,
        "any.only": "Confirm Password doesn't match password",
      }),
  });
  return schema.validate(req, { abortEarly: false });
}

module.exports = {
  validateForm,
    validateLogin,
  verifyEmail,
  newPassword,
  resetPassword,
  validateUpdateProfile,
};