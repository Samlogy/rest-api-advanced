import compression from 'compression'
import express, { Request, Response } from 'express'
import corsMiddleware from './middlewares/cors.middleware'
import deserializeData from './middlewares/deserializeData.middleware'
import { globalErrorHandler, notFoundRoute } from './middlewares/error.middleware'
import security from './middlewares/security.middleware'
import authRoutes from './routes/auth.route'
// import { successHandler, errorHandler } from "./utils/logs.utils";
// import checkApiVersion from "./middlewares/checkApiVersion.middleware";

export default class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.app.use('/health-check', (req: Request, res: Response): void => {
      res.json({ message: 'health-check' })
    })

    // set a set of attack preventions --> secure some well know web vulnerabilities OWASP
    security(this.app)

    // // CORS configuration
    corsMiddleware(this.app)

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
