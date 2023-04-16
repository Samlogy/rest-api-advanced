import cors from 'cors'
import { Application } from 'express'
const allowedOrigins = ['http://localhost:3000', 'http://yourapp.com']
const allowedMethods = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']

// allow requests with no origin
// (like mobile apps or curl requests)
export default function corsMiddleware(app: Application) {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
          return callback(new Error(msg), false)
        }
        return callback(null, true)
      },
      methods: allowedMethods,
      credentials: true,
      optionsSuccessStatus: 200
    })
  )
}
