const {
    regiseter,
    login,
    logOut,
    getUser,
    updatePassword,
  } = require("../Controller/authController");
  const { isAuthenticated } = require("../middlewares/auth.js");
  
  const router = require("express").Router();
  
  router.route("/regiseter").post(regiseter);
  router.route("/login").post(login);
  router.route("/logout", isAuthenticated).get(logOut);
  router.route("/getuser", isAuthenticated).get(getUser);
  router.route("/update/password").put(updatePassword);
  
  module.exports = router;
  