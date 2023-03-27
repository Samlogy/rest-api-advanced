import { Router } from "express";
import { isAthenticated, isValidRole } from "../middlewares/auth.middlewares";
import AuthController from "../controllers/auth.controller";

export default class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();

    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/register",
      this.authController.register.bind(this.authController)
    );
    this.router.post(
      "/login",
      isAthenticated,
      isValidRole("admin"),
      this.authController.login.bind(this.authController)
    );
    this.router.get(
      "/logout",
      this.authController.logout.bind(this.authController)
    );
  }
}
