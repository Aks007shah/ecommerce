const authModal = require("../models/Auth");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "yourSecretKey123";

class Auth {
  getAllUsers = async (req, res) => {
    const data = await authModal.find({});

    if (!data) {
      return res.status(400).json({ message: "No User Found" });
    }

    if (data.length > 0) {
      res.status(200).json({ message: "Users Fetched", data: data });
    }
  };

  registerUsers = async (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = await authModal.findOne({ email });

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    if (!checkUser) {
      const users = await new authModal({
        name: name,
        email: email,
        password: hashPassword,
      });

      await users.save();

      res
        .status(201)
        .json({ message: "User Registered Successfully", data: users });
    }
    res.status(400).json({ message: "User Already Registered, please Login" });
  };

  loginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
      const checkUser = await authModal.findOne({ email });

      if (!checkUser) {
        return res
          .status(400)
          .json({ message: "User not found. Please register first." });
      }

      const comparePassword = await bcrypt.compare(
        password,
        checkUser.password
      );

      if (!comparePassword) {
        return res
          .status(400)
          .json({ message: "Wrong password. Please try again!" });
      }

      const token = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          isAdmin: checkUser.isAdmin,
        },
        JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login Successfully",
        user: {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          isAdmin: checkUser.isAdmin,
        },
        token: token,
      });
    } catch (error) {
      console.log("Login Error =>", error);
      return res.status(500).json({ message: "Server Error", error });
    }
  };

  editUser = async (req, res) => {
    const { id } = req.params;

    try {
      const checkUser = await authModal.findByIdAndUpdate(
        id,
        { isAdmin: true }
      );

      if (checkUser) {
        res.status(200).json({ message: "User Set to Admin" });
      }
      res.status(200).json({ message: "Error Error" });
    } catch (error) {
      console.log(error);
    }
  };

  // server/routes/authRoutes.js (ya jahan bhi tu route define kar raha hai)
    toggleAdmin = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      return res.status(400).json({ message: "Invalid isAdmin value" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { isAdmin: isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User is now ${isAdmin ? "Admin" : "Normal User"}`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating admin status:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  
}

const obj = new Auth();
module.exports = obj;
