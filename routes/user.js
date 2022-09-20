const router = require("express").Router();
const {
  loginUser,
  registerUser,
  updateUser,
  updatePassword,
} = require("../controller/user");
// MIDDLEWARES
const { protect } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").post(protect, updateUser);
router.route("/changePassword").post(protect, updatePassword);

module.exports = router;
