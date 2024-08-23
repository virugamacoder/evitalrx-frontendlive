import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBox from "../components/Elements/InputBox";
import { useForm } from "react-hook-form";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import InputBoxLive from "../components/Elements/InputBoxLive";
import axios from "axios";
import { signUpSendOtpAPI } from "../constants/API";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Elements/Loading";

function SignUp() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    mobileNo: yup
      .string()
      .required("Mobile No is required")
      .matches(
        /^[0-9]{10}$/, // Regular expression for 10-digit phone number
        "Phone No must be exactly 10 digits"
      ),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Invalid email"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        "Password should be strong"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .test(
        "same-confirmpassword",
        "Confrim Password Not Same as Password ",
        function (value) {
          if (!value) return true;
          const password = this.parent.password;

          return password === value;
        }
      ),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    gender: yup.string().required("Gender Select is required"),
    address: yup.string().required("Home Address is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfrimPasswordVisibility = () => {
    setShowConfrimPassword(!showConfrimPassword);
  };

  const handleSignUp = async (data) => {
    setLoad(true);

    try {
      const response = await axios.post(signUpSendOtpAPI, data);
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message, { duration: 4000 });
        reset();
        navigate("/otpverification", {
          state: { email: data.email },
          replace: true,
        });
      }
    } catch (error) {
      if (error.response) {
        // If the error has a response from the server, display the server error message
        toast.error(error.response.data.message);
      } else {
        // If the error is not from the server, display a generic error message
        toast.error(
          "Failed to Registation. Please check your input and try again later."
        );
      }
    } finally {
      setLoad(false);
    }
  };

  const handleKeyDown = (event) => {
    // if (event.type === "number" || event.type === "tel") {
    //   // Check if the pressed key is not a number
    if (
      !(
        (
          (event.key >= "0" && event.key <= "9") ||
          event.key === "Tab" ||
          event.key === "F5" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight" ||
          event.key === "Delete" ||
          event.keyCode === 8 || // backspace
          (event.ctrlKey && event.keyCode === 65) ||
          (event.ctrlKey && event.keyCode === 86) || // Ctrl + V
          (event.ctrlKey && event.keyCode === 67)
        ) // Ctrl + C
      )
    ) {
      // Prevent the default behavior (don't write the character)
      event.preventDefault();
    }
    // }
  };

  const handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");

    if (!/^\d+$/.test(pastedData)) {
      event.preventDefault();
    }
    // }
  };

  return (
    <Layout>
      <Loading load={load} />
      <div className="w-full pt-3 pb-5 bg-gray-50">
        <div className="w-full mx-auto ">
          <div className="text-center">
            <div className="mt-3 mb-4">
              <h1 className="font-semibold text-3xl">Create Account</h1>
              <p className="mt-1  text-center">
                Get started with your new account today!
              </p>
            </div>
          </div>

          <div className="w-[95%] md:w-[80%] lg:w-[50%] mx-auto font-secondary">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-5">
                <InputBox
                  title={"First name"}
                  register={register}
                  filedName={"firstName"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                />
                <InputBox
                  title={"Last name"}
                  register={register}
                  filedName={"lastName"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                />
              </div>

              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-5">
                <div className="relative mb-3">
                  {/* Label */}
                  <label
                    htmlFor={"mobileNo"}
                    className={`block font-normal text-fontColor text-sm mb-2`}
                  >
                    <p>Mobile No</p>
                  </label>

                  <input
                    type={"text"}
                    id="mobileNo"
                    name="mobileNo"
                    {...register("mobileNo")}
                    className={`peer bg-transparent pl-5 h-10 w-full ps-14 items-center rounded-lg text-black placeholder-transparent ring-1 px-2  focus:ring-primaryl  focus:outline-none focus:border-rose-600 p"
                   ${
                     errors.mobileNo ? "ring-1 ring-red-500" : "ring-gray-300"
                   }`}
                    placeholder="Type Mobile Number"
                    maxLength={10}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                  />

                  <div className="absolute left-3 top-[58%] transform -translate-y-1/2 text-gray-400 cursor-pointer text-base">
                    +91
                  </div>

                  {/* Error Display */}
                  <div className="h-[2vh] pt-1">
                    {errors.mobileNo && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.mobileNo.message}
                      </p>
                    )}
                  </div>
                </div>

                <InputBoxLive
                  title={"Email Address"}
                  register={register}
                  filedName={"email"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                  schema={schema}
                  setError={setError}
                />
              </div>

              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-5">
                <div className="relative mb-3">
                  {/* Label */}
                  <label
                    htmlFor={"password"}
                    className={`block font-normal text-fontColor text-sm mb-2`}
                  >
                    <p>Password</p>
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    {...register("password")}
                    className={`peer bg-transparent pl-2 h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2  focus:ring-primaryl  focus:outline-none focus:border-rose-600"
                   ${
                     errors.password ? "ring-1 ring-red-500" : "ring-gray-300"
                   }`}
                    placeholder="Type Password"
                  />

                  <div
                    className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 cursor-pointer text-lg"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <ImEyeBlocked /> : <ImEye />}
                  </div>

                  {/* Error Display */}
                  <div className="h-[2vh] pt-1">
                    {errors.password && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative mb-3">
                  {/* Label */}
                  <label
                    htmlFor={"confrimpassword"}
                    className={`block font-normal text-fontColor text-sm mb-2`}
                  >
                    <p>Confrim Password</p>
                  </label>

                  <input
                    type={showConfrimPassword ? "text" : "password"}
                    id="confrimpassword"
                    name="confrimpassword"
                    {...register("confirmPassword")}
                    className={`peer bg-transparent pl-2 h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2  focus:ring-primaryl  focus:outline-none focus:border-rose-600"
                   ${
                     errors.confirmPassword
                       ? "ring-1 ring-red-500"
                       : "ring-gray-300"
                   }`}
                    placeholder="Type Confrim Password"
                  />

                  <div
                    className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 cursor-pointer text-lg"
                    onClick={toggleConfrimPasswordVisibility}
                  >
                    {showConfrimPassword ? <ImEyeBlocked /> : <ImEye />}
                  </div>

                  {/* Error Display */}
                  <div className="h-[2vh] pt-1">
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <InputBox
                  title={"Address"}
                  register={register}
                  filedName={"address"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                />
              </div>

              <div className="grid grid-cols-1  md:grid-cols-2 md:gap-5">
                <InputBoxLive
                  type="date"
                  title={"Date of Birth"}
                  register={register}
                  filedName={"dateOfBirth"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                  schema={schema}
                  setError={setError}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="mb-6">
                <div className="mb-2">Gender</div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center  gap-2 text-base">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      className="accent-primaryl w-4 h-4 hover:scale-110"
                      {...register("gender")}
                    />
                    <label for="male" className="cursor-pointer pt-2">
                      Male
                    </label>
                  </div>

                  <div className="flex items-center gap-2 text-base">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      {...register("gender")}
                      className="accent-primaryl w-4 h-4 hover:scale-110"
                    />
                    <label for="female" className="cursor-pointer pt-2">
                      Female
                    </label>
                  </div>
                  {/* Error Display */}
                  <div className="h-[2vh] pt-1">
                    {errors.gender && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center">
                <button
                  className="bg-[#496989] hover:bg-opacity-85 py-3  w-full font-semibold text-center text-white rounded-md tracking-widest  text-xl focus:outline-none"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
