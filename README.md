# Frontend

## Overview 🌟

This application allows users to create an account with OTP verification, log in using email and password, manage their profile, and handle password resets via email. The application uses several APIs for different functionalities.

## 🌟 Key Features

- **Authentication & Security** 🔐: Handles account creation, login, and password recovery. 📧🔑
- **User Management** 👤: Users can view and update their profile information. ✏️📝
- **Design & Responsiveness** 🌟: Utilizes Tailwind CSS to ensure a modern and responsive UI across devices. 📱💻
- **Form Handling** 📋: Ensures accurate user input using Yup and React-Hook-Form. ✔️
- **Access Control** 🚪: Secures access to certain pages, ensuring only authenticated users can access them. 🔒

## 🏗️ Project Structure

- **Frontend**: Built with React.js for creating the user interface and handling client-side logic. 🖥️
- **Styling**: Tailwind CSS is used for styling the components, ensuring a modern and responsive design. 🎨
- **Form Validation**: Yup and React-Hook-Form manage and validate user input. 📋


## 🛠️ APIs

1. **Sign Up Process** 📧
   - **`signUpSendOtpAPI`**: Sends an OTP to the user's email for account creation. 📧
   - **`signUpVerifyOtpAPI`**: Verifies the OTP received by the user to complete the signup process. ✅

2. **Login Process** 🔑
   - **`loginAPI`**: Logs in the user using their email and password. 🔑

3. **Profile Management** ✏️
   - **`profileUpdateAPI`**: Allows logged-in users to update their profile information. ✏️

4. **Password Recovery** 📬
   - **`forgotPasswordAPI`**: Sends a password reset link to the user's email. 📬
   - **`resetPasswordAPI`**: Resets the password using the link received via email. 🔒

## 🌐 Live URL

The frontend is live on Vercel. You can view the application [here](https://evitalrx-frontendlive.vercel.app/). 🌐

## 🚀 Running the Application

### Prerequisites 🛠️

- Node.js and npm installed on your machine. 🛠️

### Installation 🛠️

1. **Clone the repository**:

    ```bash
    git clone https://github.com/virugamacoder/evitalrx-frontendlive.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd evitalrx-frontendlive
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

### Running the Application 🚀

1. **Start the development server**:

    ```bash
    npm start
    ```

2. **Open your browser and go to** `http://localhost:3000` to view the application. 🌍

### Usage 💡

1. **Create Account** 🎉
   - Enter your information in the signup form. An OTP will be sent to your email. 📧
   - Verify the OTP to complete the signup process and create your account. 🎉

2. **Login** 🔑
   - Enter your email and password to log in. 🔑

3. **Manage Profile** 📝
   - Once logged in, you can update your profile information using the profile management section. 📝

4. **Forgot Password** 🔄
   - Enter your email to receive a password reset link. 📬
   - Use the link to set a new password. 🔒

## 🚀 Deployment

### Deploy on Vercel

1. **Sign Up or Log In** to [Vercel](https://vercel.com). 🖥️
2. **Import Project**: Connect your GitHub repository and import the frontend project. 🔄
3. **Deploy**: Vercel will automatically build and deploy your frontend application. 🚀

    The deployed frontend is available at [https://evitalrx-frontendlive.vercel.app/](https://evitalrx-frontendlive.vercel.app/). 🌐

## 🎨 Design

The application uses Tailwind CSS for styling, providing a clean and modern user interface. The design is responsive and optimized for different screen sizes. 🌟
