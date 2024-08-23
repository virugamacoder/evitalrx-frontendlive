import React, { useContext, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBox from "../components/Elements/InputBox";
import { useForm } from "react-hook-form";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import { loginAPI } from "../constants/API";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Elements/Loading";
import LoginPage from "../assets/Images/LoginPage.jpg";

function Login() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { login } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    setLoad(true);
    try {
      const response = await axios.post(loginAPI, data);
      console.log(response);

      if (response.status === 200) {
        toast.success("Login Successfully", { duration: 4000 });
        login(response.data.data.user, response.data.data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    } finally {
      setLoad(false);
    }
  };

  return (
    <Layout>
      <Loading load={load} />
      <div className="w-full flex justify-center items-center  bg-gray-50">
        <div className="flex w-[90%] lg:w-[80%]  border-2 rounded-2xl">
          <div className="hidden md:block md:w-[50%]">
            <img
              src={LoginPage}
              alt=""
              srcset=""
              className="h-[600px] w-full rounded-2xl"
            />
          </div>

          <div className="w-full md:w-[50%] p-5 font-secondary">
            <div>
              <h1 className="text-3xl font-semibold my-6">Log In</h1>
              <form
                onSubmit={handleSubmit(handleLogin)}
                encType="multipart/form-data"
              >
                <InputBox
                  title={"Email"}
                  register={register}
                  filedName={"email"}
                  must={true}
                  errors={errors}
                  className={"md:text-sm lg:text-base"}
                />

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
                    className={`peer bg-transparent pl-2 h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2  ps-10 focus:ring-primaryl  focus:outline-none focus:border-rose-600"
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

                <button
                  className="bg-primaryl hover:bg-opacity-90 py-2 text-2xl w-full font-semibold text-center text-white rounded-md focus:outline-none"
                  type="submit"
                >
                  Log In
                </button>
              </form>
              <div className="text-center">
                <p className="my-6">
                  <NavLink
                    to={"/forgotpassword"}
                    className="text-primaryl font-medium text-base underline"
                  >
                    Forget Your Password
                  </NavLink>
                </p>
                <p className="capitalize">
                  Don’t have an acount?{" "}
                  <NavLink
                    to={"/signup"}
                    className="text-primaryl font-medium text-base underline"
                  >
                    Sign up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
