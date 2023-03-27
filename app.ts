import compression from "compression";
import express from "express";
import corsMiddleware from "./src/middlewares/cors.middleware";
// import deserializeData from "./src/middlewares/deserializeData";
// import {
//   globalErrorHandler,
//   notFoundRoute,
// } from "./src/middlewares/errror.middlewares";
import security from "./src/middlewares/security.middleware";
// import authRoutes from "./src/routes/auth.route";
// import usersRoutes from "./src/routes/users.route";
// import { successHandler, errorHandler } from "./src/utils/logs.utils";
// import checkApiVersion from "./src/middlewares/checkApiVersion.middleware";

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    // set a set of attack preventions --> secure some well know web vulnerabilities OWASP
    security(this.app);

    // // CORS configuration
    this.app.use(corsMiddleware);

    // // Logging middleware to track requests
    // this.app.use(successHandler);
    // this.app.use(errorHandler);

    this.app.use(compression());

    // // Add the deserialization middleware to the middleware chain
    // this.app.use(deserializeData);

    // // Add API version middleware
    // // this.app.use(checkApiVersion);

    // // Routes
    // this.app.use("/auth", new authRoutes().router);
    // this.app.use("/users", new usersRoutes().router);
    // // this.app.use("/api/v1/auth", new authRoutes().router);

    // // 404 handler middleware to handle requests for non-existent routes
    // this.app.use(notFoundRoute);

    // // Error handler middleware to handle server errors and return consistent error responses
    // this.app.use(globalErrorHandler);
  }
}
