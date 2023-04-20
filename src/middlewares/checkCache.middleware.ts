import { NextFunction, Request, Response } from 'express'
import Cache from '../utils/cache'
import logger from '../utils/logger'

export const checkCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params
    const redisClient = new Cache()
    const data = await redisClient.get(key)
    if (data !== null) return res.send(data)
    return next()
  } catch (err) {
    logger.error('cache middleware: ', err)
    return next()
  }
}
