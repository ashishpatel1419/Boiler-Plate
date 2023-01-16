const Joi = require("@hapi/joi");

function addForm(req) {
  const schema = Joi.object({
    categoryName: Joi.string().empty().required().messages({
      "string.base": `Category Name should be a type of text`,
      "string.empty": "Category Name  is not allowed to be empty",
      "string.required": `Category Name is Required`,
    }),
  });

  return schema.validate(req, { abortEarly: false });
}


function editForm(req) {
  const schema = Joi.object({
    categoryName: Joi.string().empty().required().messages({
      "string.base": `Category Name should be a type of text`,
      "string.empty": "Category Name  is not allowed to be empty",
      "string.required": `Category Name is Required`,
    }),
  });

  return schema.validate(req, { abortEarly: false });
}

module.exports = {
  addForm,
  editForm,
};