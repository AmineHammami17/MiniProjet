const express = require('express');
const{signupValidator,loginValidator} = require('../utils/validators/authValidator');
const{signup,login,forgotPassword,
    verifyPassResetCode,
    resetPassword,
  }=require("../services/authService")

const router = express.Router();

router.route('/signup').post(signupValidator,signup);
router.route('/login').post(loginValidator,login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;