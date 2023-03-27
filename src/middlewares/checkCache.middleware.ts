import { Request, Response, NextFunction } from "express";
import { redisClient } from "../utils/cache.utils";

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { key } = req.params;
    const data = await redisClient.get(key);
    if (data !== null) return res.send(data);
    return next();
  } catch (err) {
    console.error(err);
    return next();
  }
};
