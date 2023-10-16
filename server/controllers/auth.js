import User from "../schemas/users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const register = async (req, res, next) => {
//   try{
//     const newUser = new User({
//       username:req.body.username,
//       email:req.body.email,
//       password:req.body.password
//     })

//     await newUser.save()
//     res.status(200).send("User created");

//   }
//   catch(err){
//     next(err)
//   }
  // try {
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(req.body.password, salt);

  //   const newUser = new User({
  //     ...req.body,
  //     password: hash,
  //   });

  //   await newUser.save();
  //   res.status(200).send("User has been created.");
  // } catch (err) {
  //   next(err);
  // }
// };
// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ details: { ...otherDetails }, isAdmin });
//   } catch (err) {
//     next(err);
//   }
// };