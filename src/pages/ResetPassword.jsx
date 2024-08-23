import PasswordIcon from "../assets/Icons/PasswordIcon";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { resetPasswordAPI } from "../constants/API";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { useState } from "react";
import Loading from "../components/Elements/Loading";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  if (!queryParams.get("token")) {
    navigate("/");
  }
  const token = queryParams.get("token");

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoad(true);
    console.log("token", token);
    console.log("password", data.password);
    try {
      const res = await axios.post(resetPasswordAPI, {
        password: data.password,
        token: token,
      });
      console.log(res);

      if (res.status === 200) {
        toast.success("Password changed successfully. Please login.", {
          duration: 4000,
        });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <Loading load={load} />

      <div className="relative w-full  justify-center items-center p-2">
        <div className="flex justify-center items-center ">
          <div className="items-center justify-center w-fit bg-white mx-auto p-5 border-2 rounded-2xl">
            <div className="text-center">
              <div className="mt-3 mb-4">
                <h1 className="font-semibold text-3xl">Reset Your Password</h1>
                <p className="mt-1  text-center max-w-80 py-2">
                  Please enter a new password to reset your account
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-3 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    {...register("password")}
                    className={`peer bg-transparent pl-5 h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-indigo-900 ps-10 focus:ring-primaryl focus:outline-none focus:border-rose-600 ${
                      errors.password ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  <div className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400">
                    <PasswordIcon />
                  </div>
                  <label
                    htmlFor="email"
                    className={`absolute cursor-text left-0 -top-5 font-bold text-indigo-900 text-xs bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-primaryl  peer-focus:text-sm transition-all ${
                      errors.password ? "text-red-500" : ""
                    }`}
                  >
                    Password
                  </label>

                  <div
                    className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-lg mr-2 transition-colors hover:text-gray-500" />
                    ) : (
                      <FaEye className="text-lg mr-2 transition-colors hover:text-gray-500" />
                    )}
                  </div>
                  <div className="h-[3vh] pt-2">
                    {errors.email && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="">
                  <button
                    type="submit"
                    className="bg-primaryl hover:bg-opacity-90 h-10 text-xl  tracking-widest w-full font-semibold text-center text-white rounded-md"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </form>

            {/* Go For Signup  */}
          </div>
        </div>
        {/* Login Form Bottom Side Left and Right Img */}
        <div className=" flex h-[25%]  mt-4  mx-[4%]  lg:mx-[16%]  justify-between ">
          {/* <img
            src={LoginVectorLeft}
            className="w-34 h-36"
            alt="LogiForm Left Img"
          />
          <img
            src={LoginVectorRight}
            className="w-34 h-36"
            alt="LogiForm Right Img"
          /> */}
        </div>
      </div>
    </Layout>
  );
}

export default ResetPassword;
