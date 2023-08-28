
```markdown
# Authentication System with Express, TypeScript, OOP, and MongoDB

![Authentication System](https://github.com/alaamohamed58/authentication_system/raw/main/logo.png)

Welcome to the Authentication System repository! This project provides a powerful authentication system built using Express, TypeScript, Object-Oriented Programming (OOP) principles, and MongoDB. It's designed to seamlessly integrate into your web applications, offering robust user registration, login, password reset, and session management functionalities for enhanced security and user management.

## Features

- User registration with email verification.
- Secure user login and session management.
- Password reset functionality via email.
- Developed using TypeScript for type-safe development.
- Utilizes Express for robust and scalable routing.
- Incorporates Object-Oriented Programming (OOP) principles for maintainable code.
- Data storage and retrieval powered by MongoDB.
- Customizable to fit your application's unique requirements.
- Built with security best practices in mind.

## Getting Started

Follow these steps to set up the Authentication System in your project.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/alaamohamed58/authentication_system.git
   ```

2. Change to the project directory:

   ```sh
   cd authentication_system
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

### Configuration

1. Rename the `config.example.json` file to `config.json`.

2. Open `config.json` and configure the following settings:

   - `port`: The port number on which the application will run.
   - `database`: Configure your MongoDB connection details (e.g., URL, credentials, database name).
   - `mail`: Configure email settings for user verification and password reset emails.
   - `session`: Configure session settings (e.g., session secret, expiration time).

## Usage

This section outlines how to use the various functionalities provided by the Authentication System.

### User Registration

To allow users to register:

1. Create a registration form in your web application.
2. Send a POST request to the `/register` endpoint with the following parameters:
   - `email`: User's email address
   - `password`: User's desired password

### User Login

To enable user login:

1. Create a login form in your web application.
2. Send a POST request to the `/login` endpoint with the following parameters:
   - `email`: User's registered email address
   - `password`: User's password

### Password Reset

To enable password reset functionality:

1. Create a "Forgot Password" form in your web application.
2. Send a POST request to the `/forgot_password` endpoint with the following parameters:
   - `email`: User's registered email address
3. The system will send a password reset email to the user's email address.
4. In the email, there will be a link to the `/reset_password` endpoint. Clicking on this link will allow the user to reset their password.

## Contributing

Contributions to the Authentication System are welcome! If you encounter issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

We hope this Authentication System helps you enhance the security and user management of your web applications. If you have any questions or need assistance, feel free to reach out.

**Author:** [Alaa Mohamed](https://github.com/alaamohamed58)

**Project Repository:** [https://github.com/alaamohamed58/authentication_system](https://github.com/alaamohamed58/authentication_system)

