const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const JWT_SECRET =
    "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      address: user.address,
      state: user.state,
      pincode: user.pincode,
      landmark: user.landmark,
      gender: user.gender,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone=req.body.phone || user.phone;
    user.city = req.body.city || user.city;
    user.address = req.body.address || user.address;
    user.state=req.body.state || user.state;
    user.pincode = req.body.pincode || user.pincode;
    user.landmark = req.body.landmark || user.landmark;
    user.gender=req.body.gender || user.gender;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      phone: updateUser.phone,
      city: updateUser.city,
      address: updateUser.address,
      state: updateUser.state,
      pincode: updateUser.pincode,
      landmark: updateUser.landmark,
      gender: updateUser.gender,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user Not Found!");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(422).json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "45m",
        });
        const link = `http://localhost:8080/api/users/reset-password/${oldUser._id}/${token}`;
        const data = { token }
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "anamika.rajput@cbnits.com",
                pass: "cbnits@1234",
            },
        });

        var mailOptions = {
            from: "anamika.rajput@cbnits.com",
            to: req.body.email,
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json("somthing went wrong")
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ id: oldUser._id, token: token })
            }
        });
        console.log(link);
    } catch (error) { }
});

const resetLink = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const secret2 = JWT_SECRET + oldUser.confirmPassword
    try {
        const verify = jwt.verify(token, secret, secret2);
        const encryptedPassword = await bcrypt.hash(password, 10);
        const encryptedConfirmPassword = await bcrypt.hash(confirmPassword, 10)
        await User.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    password: password,
                },
            }
        );
        // res.redirect("http://localhost:3001/")
        res.render('index', { email: verify.email, title: "Reset Password", success: "Password Updated Successfully" })
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});

const resetGetLink = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, success: '' })
      //   res.status(200).json({ email: verify.email, status: " Verified" })
  } catch (error) {
      console.log(error);
      res.status(500).json("Already used this link for reset password")
  }
});



module.exports = {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgetPassword,
  resetLink,
  resetGetLink,
};
