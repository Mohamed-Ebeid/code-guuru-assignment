import User from "../Models/userModel.js";
import dotenv from "dotenv";
import { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(req.body);
  //console.log(user);
  try {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      } else {
        return res.status(401).send({ message: "Invalid password" });
      }
    }
    return res
      .status(401)
      .send({ message: "This email does not exist in our database" });
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const signUp = async (req, res) => {
  //return res.json(req.body);
  try {
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    }).save();

    return res.status(201).send({
      // _id: user._id,
      name: user.name,
      message: "You have signed up successfully!!!",
    });
    // res.send("None found");
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const forgotPassword = async (req, res) => {
  //console.log(process.env.SENDGRID_KEY);
  const { email } = req.body;
  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .send({ message: "This email does not exist in our database" });
  }
  // generate code
  const resetCode = nanoid(5).toUpperCase();
  // save to db
  user.code = resetCode;
  user.save();
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: `${user.email}`,
    subject: "Password reset code",
    text: `The rest code is ${resetCode}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ ok: false });
    } else {
      res.json({ ok: true });
    }
  });
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, code } = req.body;
    const user = await User.findOne({ email, code });
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    //const hashedPassword = await hashPassword(password);
    user.password = bcrypt.hashSync(req.body.password);
    user.code = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something went wrong!!!",
    });
  }
};

// export const test = (req, res) => {
//   const currentDate = new Date();
//   console.log(currentDate);
//   return;
// };
