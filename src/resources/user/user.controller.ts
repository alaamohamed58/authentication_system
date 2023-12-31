import crypto from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import sendEmail from "../../utils/email";
import HttpException from "../../utils/http.exceptions";

class UserController implements Controller {
  public path = "/user";
  public router = Router();

  private service = new UserService();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.signUp);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/forgotPassword`, this.forgetPassword);
    this.router.post(`${this.path}/resetPassword/:token`, this.resetPassword);
  }

  //sign up
  private signUp = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const { first_name, last_name, email, password, password_confirmation } =
        req.body;

      const token = await this.service.register(
        first_name,
        last_name,
        email,
        password,
        password_confirmation
      );

      res.status(201).json({
        message: "User created successfully",
        accessToken: token,
      });
    }
  );

  //login
  private login = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      res.status(200).json({
        message: "User logged in successfully",
        accessToken: token,
      });
    }
  );

  //forget password
  private forgetPassword = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const { email } = req.body;

      const { user, resetPasswordToken } = await this.service.forgotPassword(
        email
      );

      await user.save({ validateBeforeSave: false });

      try {
        const resetURL = `${req.protocol}://${req.get(
          "host"
        )}/api/v1/user/resetPassword/${resetPasswordToken}`;

        await sendEmail({
          to: user.email,
          subject: "Reset Password",
          message: `Forgot your password ? Submit this link to set new password : ${resetURL}`,
        });
        res.status(200).json({
          message: "token sent to email",
        });
      } catch (err) {
        console.log(err);
        user.password_reset_token = undefined;
        user.password_reset_expires_at = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
          new HttpException(
            "there was an error sending an email, please try later" + err,
            500
          )
        );
      }
    }
  );

  //reset password
  private resetPassword = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
      const { password, password_confirmation } = req.body;
      const token = await this.service.resetPassword(
        password,
        password_confirmation,
        hashedToken
      );
      res.status(200).json({
        message: "Password reset successfully",
        accessToken: token,
      });
    }
  );
}

export default UserController;
