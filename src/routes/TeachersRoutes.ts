import { Router } from "express";
import { compare } from "bcrypt";
import { GettingUsers } from "../../dbQueries/getData";
import jwt from "jsonwebtoken";
import { TeachMiddlware } from "../middlewares/teachermiddleware";

export const teachersRoute = Router();

teachersRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const CheckingUser = await GettingUsers(username);
  if (!CheckingUser) {
    return res.status(404).json({
      msg: "Username Don't exist! , Check UserName.",
    });
  } else {
    const ComparingPass = await compare(password, CheckingUser.password);

    if (!ComparingPass) {
      return res.status(400).json({
        msg: "Wrong Password!",
      });
    }
    const Tokens = jwt.sign(
      {
        div: CheckingUser.ClassRoom,
        username: CheckingUser.username,
        iat: Date.now(),
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );
    if (!Tokens) {
      return res.status(500).json({
        msg: "Internal server Error while generating tokens , try again after 5 minutes",
      });
    }
    return res.status(200).json({
      msg: "You are successfully Signed!",
      tokens: Tokens,
    });
  }
});


