const jwt = require("jsonwebtoken");
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { token } = require("morgan");
const sendEmail = require('../utils/sendEmail');
const Student = require('../models/student');
const Teacher = require('../models/teacher');


// @desc  Signup user
// @route PUT  /api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  try {
    const { name, lastname, email, CIN, password, role } = req.body;

    const user = await User.create({
      name,
      lastname,
      email,
      CIN,
      password,
      role,
    });

    console.log('User created:', user);

    let createdProfile;

    if (role === 'student') {
      const { speciality, level, group } = req.body;
      if (!speciality || !level || !group) {
        await user.remove();
        console.error('Missing required fields for student profile');
        return res.status(400).json({ message: 'Missing required fields for student profile' });
      }

      createdProfile = await Student.create({
        UniversitySituation: req.body.UniversitySituation,
        internships: req.body.internships,
        speciality,
        level,
        group,
        user: user._id,
      });

      console.log('Student profile created:', createdProfile);
    } else if (role === 'teacher') {
      createdProfile = await Teacher.create({
        user: user._id,
      });

      console.log('Teacher profile created:', createdProfile);
    }

    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(201).json({ data: { user, profile: createdProfile }, token });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ message: 'Error creating user profile', error });
  }
});


// @desc  Login user 
// @route PUT  /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ApiError("Invalid email or password", 401));
  }

  const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
  );

  res.status(200).json({ data: user, token });
});

exports.protect = asyncHandler(async(req,res,next)=>{
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split('')[1];
        
    }
    if(!token){
        return next(new ApiError("You are not logged in, please login to get access to this route",401));
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(decoded);
    const currentUser = await User.findById(decoded.userId);
    if(!currentUser){
        return next(
            new ApiError('The user that belong to this token does no longer exist',401)
        );
    }
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: `There is no user with the email: ${email}` });
  }

  const resetCode = "799764";
  const hashedResetCode = "799764";

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
  user.passwordResetVerified = false;
  await user.save();

  const message = `Hi ${user.name},\n We received a request to reset the password on your ISSATSO Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n ISSATSO Administration`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      text : message
    });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ message: 'There was an error sending the email' });
  }

  res.status(200).json({ status: 'Success', message: 'Reset code sent to email' });
});



  // @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(req.body.resetCode)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ApiError('Reset code invalid or expired'));
    }
  
    user.passwordResetVerified = true;
    await user.save();
  
    res.status(200).json({
      status: 'Success',
    });
  });



  
  // @desc    Reset password
  // @route   POST /api/v1/auth/resetPassword
  // @access  Public
  exports.resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
      );
    }
  
    if (!user.passwordResetVerified) {
      return next(new ApiError('Reset code not verified', 400));
    }
  
    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
  
    await user.save();
  
    const token = createToken(user._id);
    res.status(200).json({ token });
  });


  
  // @desc    Authorization (User Permissions)
exports.allowedTo = (...roles) =>
asyncHandler(async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ApiError('You are not allowed to access this route', 403)
    );
  }
  next();
});