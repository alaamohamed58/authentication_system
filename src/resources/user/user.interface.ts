import { Document } from "mongoose";

interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string | undefined;
  changed_at: string;
  password_reset_expires_at: string | undefined;
  password_reset_token: string | undefined;

  verifyPassword(): boolean;
  getResetPasswordToken(): string;
}

export default User;
