const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwToken");
const validateMongoDbId = require("../utils/validatemongodbId");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = await generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user?._id,
      firstname: user?.firstname,
      email: user?.email,
      token: generateToken(user),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.token) throw new Error("No Token in Cookies");
  const token = cookie.token;

  const user = await User.findOne({ token });

  if (user) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
});

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);

  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await User.find();

    res.json({ getAllUsers });
  } catch (error) {
    throw new Error(error);
  }
});

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);

    res.json({ getaUser });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  logout,
  updatedUser,
  updatePassword,
  deleteaUser,
  getallUser,
  getaUser,
};
