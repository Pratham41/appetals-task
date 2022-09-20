const Users = require("../model/user");
const generateToken = require("../utils/generateToken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json("Invalid email or password");
  }
};

exports.updateUser = async (req, res) => {
  const { email, name, mobile, avatar } = req.body;

  const user = await Users.findOne({ email });

  if (user) {
    user.email = email;
    user.name = name;
    user.mobile = mobile;
    user.avatar = avatar;
    const updatedUser = await user.save();
    return res.status(201).json(updatedUser);
  } else {
    return res.status(401).json("No user found");
  }
};

exports.updatePassword = async (req, res) => {
  const { email, name, mobile, avatar, oldPassword, newPassword } = req.body;

  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(oldPassword))) {
    user.email = email;
    user.name = name;
    user.mobile = mobile;
    user.avatar = avatar;
    user.password = newPassword;

    const updatedUser = await user.save();
    return res.status(201).json(updatedUser);
  } else {
    return res.status(401).json("No user found");
  }
};

exports.registerUser = async (req, res) => {
  const userExists = await Users.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(400).json("User already exists");
  }

  const user = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json("Invalid user data");
  }
};
