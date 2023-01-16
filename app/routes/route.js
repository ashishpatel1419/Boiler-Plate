const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const { auth, generateAuthToken } = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

router.get("/", userController.login);
router.post(
  "/api/register",
  upload.single("uploadImage"),
  userController.authregister
);

router.get("/singup", userController.register);

router.post(
  "/api/login", generateAuthToken,
  userController.authlogin
);

router.get("/forgetPass", userController.forgetPass);
router.post("/api/verifyEmail", userController.verifyEmail);

router.get("/otp", userController.otp);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/updatePassword", userController.updatePassword);
router.get("/profile", auth, userController.viewProfile);

router.get("/updateProfile", auth, userController.updateProfile);
router.post(
  "/editProfile",
  auth,
  upload.single("uploadImage"),
  userController.editProfile
);
router.get("/index", auth, userController.index);
router.get("/resetPassword", auth, userController.resetPassword);
router.post("/newPassword", auth, userController.newPassword);
router.get("/logout", auth, userController.logout);

module.exports = router;
