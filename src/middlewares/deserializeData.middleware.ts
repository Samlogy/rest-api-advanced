import { NextFunction, Request, Response } from "express";
import { decryptData } from "../utils/encryption.utils";

export default function deserializeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.method !== "GET" &&
    req.body &&
    Object.keys(req.body).length === 1 &&
    typeof req.body?.data === "string"
  ) {
    try {
      req.body = decryptData(req.body.data);
      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to deserialize data" });
    }
  } else return next();
}
