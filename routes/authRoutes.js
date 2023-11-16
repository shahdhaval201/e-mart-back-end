const express = require("express");
const {createUser,loginUserCtrl} = require("../controller/useCtrl");
const router = express.Router();

router.post("/login",loginUserCtrl)
router.post("/register",createUser)



module.exports = router
