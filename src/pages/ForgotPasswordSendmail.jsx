import UserIdIcon from "../assets/Icons/UserIdIcon";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { forgotPasswordAPI } from "../constants/API";
import { useState } from "react";
import Loading from "../components/Elements/Loading";

function ForgotPasswordSendmail() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Invalid email"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoad(true);
    try {
      const response = await axios.post(forgotPasswordAPI, {
        email: data.email,
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          duration: 4000,
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Layout>
      {/* Loading Component */}
      <Loading load={load} />
      <div className="relative w-full justify-center items-center p-2">
        <div className="flex justify-center items-center w-fit bg-white mx-auto p-5 border-2 rounded-2xl ">
          <div className="">
            <div className="text-center">
              <div className="mt-3 mb-4">
                <h1 className="font-semibold text-3xl">Forgot Password</h1>
                <p className="mt-1  text-center max-w-80 py-2">
                  Enter A Email Address And We Will Send You A Link To Reset
                  Your Password
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-3 rounded-lg">
                <div className="relative bg-inherit">
                  <input
                    id="email"
                    name="email"
                    {...register("email")}
                    className={`peer bg-transparent pl-5 h-10 w-full rounded-lg text-black placeholder-transparent ring-1 px-2 ring-indigo-900 ps-10 focus:ring-primaryl focus:outline-none focus:border-rose-600 ${
                      errors.email ? "ring-2 ring-red-500" : ""
                    }`}
                  />
                  <div className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400">
                    <UserIdIcon />
                  </div>
                  <label
                    htmlFor="email"
                    className={`absolute cursor-text left-0 -top-5 font-bold text-secondary text-xs bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-primaryl peer-focus:text-sm transition-all ${
                      errors.email ? "text-red-500" : ""
                    }`}
                  >
                    EMAIL ID
                  </label>

                  <div className="h-[3vh] pt-2">
                    {errors.email && (
                      <p className="text-red-500 text-xs  leading-none">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="my-2">
                  <button
                    type="submit"
                    className="bg-primaryl hover:bg-opacity-90 h-10 text-xl  tracking-widest w-full font-semibold text-center text-white rounded-md"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            </form>
            {/* Go For Signup  */}
            <div>
              {/* OR Divider */}
              <div className="flex items-center justify-center mt-3">
                <div className="w-1/4 h-px border-t border-gray-300"></div>
              </div>
              <div className="text-center z-10 mb-3 text-black text-base mt-3">
                <span className="font-medium">Don’t have an account?</span>

                <NavLink to="/signup">
                  <span className="font-bold hover:text-gray-600 ">
                    {" "}
                    Register Now
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPasswordSendmail;
