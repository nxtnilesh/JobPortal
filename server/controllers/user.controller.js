import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const create = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    return res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials email", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid credentials password", success: false });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Invalid credentials role", success: false });
    }
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxage: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome Back ${user.fullname}`, user, success: true });
      // return only required user data if needed
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updataProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // cloundinary

    const skillsArray = skills.split(",");
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.skills = skillsArray;

    await user.save();
    return res
      .status(200)
      .json({ message: "Profile updated", user, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
