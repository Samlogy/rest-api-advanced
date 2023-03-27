import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt.utils";

// Middleware function that verifies a JWT token and adds the decoded user to the request object
export const isAthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided !" });

  const decoded = decodeToken(token);
  if (!decoded)
    return res.status(401).json({ success: false, message: "Invalid token" });

  res.locals.user = decoded;
  return next();
};

// Middleware function that checks if the user has the required role to access a protected route
export const isValidRole =
  (...role: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user?.role;
    if (!role.includes(userRole))
      return res
        .status(403)
        .json({ success: false, message: "Permission danied !" });
    return next();
  };
