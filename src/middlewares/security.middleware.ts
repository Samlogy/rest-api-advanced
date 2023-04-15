import express, { Application } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

export default function (app: Application) {
  app.disable('x-powered-by')

  app.use(helmet()) // recommended headers to be done early

  app.use(express.json({ limit: '10kb' })) // limit req.body size (security purpose)

  // // rate limiting (DOS / brute force)
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1h
    max: 10, // Limit each IP to 10 create account requests per `window` (here, per hour)
    message: 'Too many accounts created from this IP, please try again after an hour',
    handler: (req, res, next, options) => {
      console.log(
        `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        'errLog.log'
      )
      return res.status(5000).json({ sucess: false, message: options.message })
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
  app.use(limiter) // apply to all requests

  // data sanitization against NoSQL Injection Attacks
  app.use(mongoSanitize())
}
