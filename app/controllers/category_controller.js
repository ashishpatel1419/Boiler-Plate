
const categoryModel = require("../models/category_model");
const { addForm, editForm } = require("../validation/categoryValidation");

exports.category = async (req, res) => {
  const result = await categoryModel.find();
  res.render("category", {
    users: result,
  });
};

exports.addCategory = (req, res) => {
  return res.render("addCategory", {
    values: req.body,
  });
};

exports.addData = (req, res) => {
  try {
    const { error } = addForm(req.body);
    if (error) {
        if (error.details[0].context.key == "categoryName") {
          var err1 = error.details[0].message;
          res.render("editCategory", {
            error1: err1,
            users: req.body,
          });
        }
    } else {
      const data = {
        categoryName: req.body.categoryName,
      };

      const categoryData = new categoryModel(data);
      categoryData.save().then((data) => {
        res.redirect("/category");
      });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

exports.editCategory = (req, res) => {
  categoryModel.findById(req.params.id, function (err, result) {
    res.render("editCategory", {
      users: result,
    });
  });
};

exports.editData = async (req, res) => {
  try {
    const { error } = editForm(req.body);
    if (error) {
      if (error.details[0].context.key == "categoryName") {
        var err1 = error.details[0].message;
        res.render("editCategory", {
          error1: err1,
          users: req.body,
        });
      }
    } else {
      const data = {
        categoryName: req.body.categoryName,
      };
       await categoryModel.findByIdAndUpdate(req.params.id, data);
      res.redirect("/category");
    }
  } catch (err) {
    console.log(err);
  }
};


exports.deleteData = (req, res) => {
  const id = req.params.id;
  categoryModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `cannot Delete user with ${id}.May be is wrong` });
      } else {
        res.redirect("/category");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id" + id,
      });
    });
};


exports.deleteAll = (req, res) => {
  const id = req.query;
  var countId = Object.keys(id).length;
  for (let i = 0; i < countId; i++) {
    categoryModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        logger.error("error", err);
      }
    });
  }
  return res.redirect("/category");
};
