import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.json({ message: "This user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ name, email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered successfully" });
});

// ...

router.post("/login", async (req, res) => {
  const { email, password, secretCode } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (secretCode && secretCode.toLowerCase() === "admin") {
      await UserModel.findByIdAndUpdate(user._id, { role: "admin" });

      const adminToken = jwt.sign({ id: user._id, role: "admin" }, "adminsecret");
      return res.json({ token: adminToken, userID: user._id, name: user.name, role: "admin" });
    } else {
      const token = jwt.sign({ id: user._id }, "secret");
      return res.json({ token, userID: user._id, name: user.name });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ...

export { router as userRouter };
