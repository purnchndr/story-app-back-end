var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../errors/appError.js');
const { catchAsync } = require('../errors/error.js');
const User = require('../models/user.js');

const register = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) throw new AppError(401, 'user already registered');
  const pass = await bcrypt.hash(password, 10);
  const userdata = { username, password: pass };
  user = await User.create(userdata);
  const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);
  res.send({
    user,
    result: true,
    message: 'User created',
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new AppError(402, 'Username and Password required');
  let user = await User.findOne({ username });
  if (!user) throw new AppError(401, 'Incorrect Username or Password');
  const pass = await bcrypt.compare(password, user.password);
  const token = jwt.sign({ token: user._id }, process.env.JWT_SECRETE);
  if (!pass) throw new AppError(401, 'Incorrect Username or Password');
  return res.status(200).json({
    message: 'Logging successful',
    user,
    token,
    result: true,
  });
});

const auth = catchAsync(async (req, res, next) => {
  const token = req.headers['token'];
  if (!token) throw new AppError(403, 'Auth token is required');
  const userId = jwt.verify(token, process.env.JWT_SECRETE)?.token;
  const user = await User.findById(userId).select('-password -__v');
  if (!user) throw new AppError(403, 'Invalid Auth Token');
  req.user = user;
  next();
});

module.exports = { auth, register, login };
