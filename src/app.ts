import compression from 'compression'
import express from 'express'
import corsMiddleware from './middlewares/cors.middleware'
import deserializeData from './middlewares/deserializeData.middleware'
import { globalErrorHandler, notFoundRoute } from './middlewares/error.middleware'
import security from './middlewares/security.middleware'
import authRoutes from './routes/auth.route'
// import { successHandler, errorHandler } from "./utils/logs.utils";
// import checkApiVersion from "./middlewares/checkApiVersion.middleware";
import cors from 'cors'

const allowedOrigins = ['http://example.com', 'http://localhost:3000']

// Define CORS options
const corsOptions = {
  origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default class App {
  public app: express.Application

  constructor() {
    this.app = express()

    // set a set of attack preventions --> secure some well know web vulnerabilities OWASP
    security(this.app)

    // // CORS configuration
    this.app.use(corsMiddleware)

    // // Logging middleware to track requests
    // this.app.use(successHandler);
    // this.app.use(errorHandler);

    this.app.use(compression())

    // // Add the deserialization middleware to the middleware chain
    this.app.use(deserializeData)

    // // Add API version middleware
    // // this.app.use(checkApiVersion);

    // // Routes
    this.app.use('/auth', new authRoutes().router)
    // // this.app.use("/api/v1/auth", new authRoutes().router);

    // // 404 handler middleware to handle requests for non-existent routes
    this.app.use(notFoundRoute)

    // // Error handler middleware to handle server errors and return consistent error responses
    this.app.use(globalErrorHandler)
  }
}
