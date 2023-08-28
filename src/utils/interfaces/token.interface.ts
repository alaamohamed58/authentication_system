import User from "resources/user/user.interface";

interface Token {
  user: User;
  expiresIn: number;
}

export default Token;
