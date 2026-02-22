import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export interface StudentAuthReq extends Request {
  student?: {
    rollNo: number;
    email: string;
  };
}
export function StudentAuth(
  req: StudentAuthReq,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace("bearer", "");
  if (!token) {
    return res.status(404).json({
      msg: "Jwt Tokens not found!",
    });
  }
  verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.json({
        msg: "Eroor",
      });
    } else {
      req.student = {
        rollNo: (decoded as JwtPayload).rollNo as number,
        email: (decoded as JwtPayload).email as string,
      };
      next();
    }
  });
}
