const testModel = require("../models/testimonial_model");
const { addForm, editForm } = require("../validation/testimonialValidation");

exports.testimonial = async (req, res) => {
  const result = await testModel.find();

  res.render("testimonial", {
    users: result,
  });
};

exports.addTest = (req, res) => {
  return res.render("addTestimonial", {
    values: req.body,
  });
};

exports.addData = (req, res) => {
  try {
    const { error } = addForm(req.body);
    if (error) {
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        res.render("addTestimonial", {
          error1: err1,
          values: req.body,
        });
      }

      if (error.details[0].context.key == "designation") {
        var err2 = error.details[0].message;
        res.render("addTestimonial", {
          error2: err2,
          values: req.body,
        });
      }

      if (error.details[0].context.key == "description") {
        var err3 = error.details[0].message;
        res.render("addTestimonial", {
          error3: err3,
          values: req.body,
        });
      }
    } else {
      const data = {
        name: req.body.name,
        designation: req.body.designation,
        description: req.body.description,
        uploadImage: req.file.filename,
      };

      const testData = new testModel(data);
      testData.save().then((data) => {
        res.redirect("/testimonial");
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.editTest = (req, res) => {
  testModel.findById(req.params.id, function (err, result) {
    res.render("editTestimonial", {
      users: result,
    });
  });
};

exports.editData = async (req, res) => {
  try {
    let { error } = editForm(req.body);
    if (error) {
      return res.status(400).send(error.details[0]);
    }
    let updatetest = await testModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        designation: req.body.designation,
        description: req.body.description,
      }
    );
    if (req.file) {
      updatetest = await testModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          uploadImage: req.file.filename,
        }
      );
    }
    res.redirect("/testimonial");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  testModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `cannot Delete user with ${id}.May be is wrong` });
      } else {
        res.redirect("/testimonial");
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

  let countId = Object.keys(id).length;
  for (let i = 0; i < countId; i++) {
    testModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        logger.error("error", err);
      }
    });
  }
  return res.redirect("/testimonial");
};