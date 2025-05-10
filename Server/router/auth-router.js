const express = require('express');
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller")
const {signupSchema,loginsSchema} = require("../validator/auth_validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/authMiddleware");
router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema),authcontrollers.register)
router.route("/login").post(validate(loginsSchema),authcontrollers.login)


router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;