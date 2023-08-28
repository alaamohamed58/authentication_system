import bcrypt from "bcrypt";
import HttpException from "../../utils/http.exceptions";
import { createToken } from "../../utils/token";
import UserModel from "../user/user.schema";
import User from "./user.interface";
import Token from "utils/interfaces/token.interface";

class UserService {
  private user = UserModel;

  //registration
  public async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<string> {
    const newUser = await this.user.create({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    });

    const accessToken = createToken(newUser);
    return accessToken;
  }

  //login
  public async login(email: string, password: string): Promise<string> {
    const user = await this.user.findOne({ email }).select("+password");
    if (!user) {
      throw new HttpException("Invalid credentials", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException("Invalid credentials", 401);
    }
    const accessToken = createToken(user);
    return accessToken;
  }

  //forgot password
  public async forgotPassword(
    email: string
  ): Promise<{ resetPasswordToken: string; user: User }> {
    const user = await this.user.findOne({ email });
    if (!user) {
      throw new HttpException("Invalid credentials", 401);
    }
    const resetPasswordToken = user.getResetPasswordToken();

    return {
      resetPasswordToken,
      user,
    };
  }

  //reset password
  public async resetPassword(
    password: string,
    password_confirmation: string,
    hashedToken: string
  ): Promise<string> {
    const user = await this.user.findOne({
      password_reset_token: hashedToken,
      password_reset_expires_at: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      throw new HttpException("Token is invalid or has expired", 400);
    }

    user.password = password;
    user.password_confirmation = password_confirmation;
    user.password_reset_expires_at = undefined;
    user.password_reset_token = undefined;
    await user.save();

    const token = createToken(user);
    return token;
  }
}

export default UserService;
