# React Application

## Overview

This application allows users to create an account with OTP verification, log in using email and password, manage their profile, and handle password resets via email. The application uses several APIs for different functionalities.

## APIs

1. **Sign Up Process**
   - **`signUpSendOtpAPI`**: Sends an OTP to the user's email for account creation. 📧
   - **`signUpVerifyOtpAPI`**: Verifies the OTP received by the user to complete the signup process. ✅

2. **Login Process**
   - **`loginAPI`**: Logs in the user using their email and password. 🔑

3. **Profile Management**
   - **`profileUpdateAPI`**: Allows logged-in users to update their profile information. ✏️

4. **Password Recovery**
   - **`forgotPasswordAPI`**: Sends a password reset link to the user's email. 📬
   - **`resetPasswordAPI`**: Resets the password using the link received via email. 🔒

## Live URL

You can view the live application [here](https://evitalrx-frontendlive.vercel.app/). 🌐

## Running the Application

### Prerequisites

- Node.js and npm installed on your machine. 🛠️

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/virugamacoder/evitalrx-frontendlive.git
    ```

2. Navigate to the project directory:

    ```bash
    cd evitalrx-frontendlive
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

2. Open your browser and go to `http://localhost:3000` to view the application. 🌍

### Usage

1. **Create Account**
   - Enter your information in the signup form. An OTP will be sent to your email. 📧
   - Verify the OTP to complete the signup process and create your account. 🎉

2. **Login**
   - Enter your email and password to log in. 🔑

3. **Manage Profile**
   - Once logged in, you can update your profile information using the profile management section. 📝

4. **Forgot Password**
   - Enter your email to receive a password reset link. 📬
   - Use the link to set a new password. 🔒
