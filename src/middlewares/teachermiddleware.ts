import jwt, { verify, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface authRequest extends Request {
  teacher?: {
    division: string;
    classRoom: string;
    initalizetime: number;
  };
}

export function TeachMiddlware(
  req: authRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization?.replace("Bearer ", "");

    if (!header) {
      return res.status(400).json({
        msg: "Token Not Found!",
      });
    }
    const verifiedToken = jwt.verify(
      header,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.teacher = {
      division: verifiedToken.div as string,
      classRoom: verifiedToken.username as string,
      initalizetime: verifiedToken.iat as number,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      msg: "Wrong Tokens!",
      err: error,
    });
  }
}
