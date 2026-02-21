import { Router } from "express";
import z from "zod";
import { prisma } from "../../dbQueries/lib/client";
import { HashPass } from "../../dbQueries/hashingPass";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const studentRoute = Router();

const zodValidateData = z.object({
  rollNo: z.number(),
  email: z
    .string()
    .toLowerCase()
    .includes("@myschool.edu", "email must contain @myschool.edu"),
  pass: z
    .string()
    .min(8, "password must contain atleast 8 charcters")
    .max(16, "password can't be more than 16 character"),
});

studentRoute.post("/signup", async (req, res) => {
  try {
    const passData = zodValidateData.safeParse(req.body);

    const re_pass = req.body.re_pass;
    if (!passData.success) {
      const [zodErrorMsg] = passData.error.issues;
      return res.status(400).json({
        msg: "Might be an error in you input",
        erroe: zodErrorMsg?.message,
      });
    }

    if (passData.data?.pass != re_pass) {
      return res.status(402).json({
        msg: "Both passwords must be matching!",
      });
    }
    const HashedPass = await HashPass(passData.data.pass);

    const db = await prisma.studentlogin
      .create({
        data: {
          email: passData.data.email,
          password: HashedPass,
          rollNo: passData.data.rollNo,
        },
      })
      .then(async () => {
        await prisma.$disconnect();
        return res.status(200).json({
          msg: "You have signedup , now you can login!",
        });
      })
      .catch(async (err) => {
        await prisma.$disconnect();
        console.error(err);

        console.log(err.name);
        return res.status(402).json({
          msg: "Check credentials, IT might be wrong and retry!",
        });
      });
  } catch (error) {
    return res.status(500).json({
      msg: "Interal server error , try after 10 minutes",
    });
  }
});

studentRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await prisma.studentlogin
      .findFirst({
        where: {
          email: email,
        },
      })
      .then(async (data) => {
        await prisma.$disconnect();
        if (!data) {
          return res.status(402).json({
            msg: "Invalid credentials!",
          });
        }
        const correctPass = await compare(password, data?.password as string);
        if (!correctPass) {
          return res.status(402).json({
            msg: "Password is incorrect, retry!",
          });
        }
        const token = sign(
          {
            rollNo: data?.rollNo,
            email: email,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: "30d" },
        );

        if (!token) {
          return res.status(500).json({
            msg: "Internal server Error while generating tokens , try again after 5 minutes",
          });
        }

        return res.status(200).json({
          msg: "Logged in ",
          token: token,
        });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        return res.status(402).json({
          msg: " Check your email",
        });
      });
  } catch (error) {
    return res.status(500).json({
      err: error,
      msg: "Internal Server error",
    });
  }
});
