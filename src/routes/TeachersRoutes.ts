import { Router } from "express";
import { compare } from "bcrypt";
import { GettingUsers } from "../../dbQueries/getData";
import jwt from "jsonwebtoken";
import { prisma } from "../../dbQueries/lib/client";
import { TeachMiddlware, authRequest } from "../middlewares/teachermiddleware";

export const teachersRoute = Router();

teachersRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const CheckingUser = await GettingUsers(email);
  if (!CheckingUser) {
    return res.status(404).json({
      msg: "email Don't exist! , Check UserName.",
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
        email: CheckingUser.email,
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

teachersRoute.post(
  "/attendance",
  TeachMiddlware,
  async (req: authRequest, res) => {
    try {
      const { rollNo, present } = req.body;
      const FidningStudent = await prisma.studentTable.findFirst({
        where: {
          rollNo: rollNo,
        },
      });
      if (!FidningStudent) {
        return res.status(404).json({
          msg: "Roll Number don't exist!",
        });
      }
      const insertingPresent = await prisma.attendanceSheet
        .create({
          data: {
            rollNo: rollNo,
            Present: present,
          },
        })
        .then(async () => {
          await prisma.$disconnect();
          return res.status(200).json({
            msg: "Attendance submitted!",
          });
        })
        .catch(async (e) => {
          await prisma.$disconnect();
          console.error(e.message);
          return res.status(500).json({
            msg: "error while submitting attendance",
            error: e.message,
          });
        });
      if (!insertingPresent) {
        return res.status(400).json({
          msg: "data is not entered in database , retry in 1 minute!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        err: error,
        msg: "Internal Server error",
      });
    }
  },
);
