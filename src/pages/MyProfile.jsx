import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBox from "../components/Elements/InputBox";
import { useForm } from "react-hook-form";

import InputBoxLive from "../components/Elements/InputBoxLive";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { profileUpdateAPI } from "../constants/API";
import Cookies from "universal-cookie";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Elements/Loading";
import ReadInputBox from "../components/Elements/ReadInputBox";

function MyProfile() {
  const cookies = new Cookies();
  const { user, token, setUser } = useContext(AuthContext);
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
    dateOfBirth: yup.string().required("Date of Birth is required"),
    gender: yup.string().required("Gender Select is required"),
    address: yup.string().required("Home Address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setLoad(true);
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("mobileNo", user.mobileNo);
      setValue("email", user.email);
      setValue("gender", user.gender);
      setValue("address", user.address);
      const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split("T")[0];
      };

      if (user.dateOfBirth) {
        setValue("dateOfBirth", formatDate(user.dateOfBirth));
      }
    }

    setLoad(false);
  }, [user]);

  const handleProfileUpdate = async (data) => {
    setLoad(true);
    console.log(data);

    try {
      const response = await axios.put(profileUpdateAPI, data, {
        headers: {
          authorization: token,
        },
      });

      if (response.status === 200) {
        console.log(response.data.data);
        setUser(response.data.data);
        cookies.set("user", response.data.data);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    } finally {
      setLoad(false);
    }
  };

  const handleKeyDown = (event) => {
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
  };

  return (
    <Layout>
      <Loading load={load} />
      <div className="w-full mx-auto my-5 ">
        <div className="text-center mb-5">
          <div className="">
            <h1 className="font-semibold text-3xl">My Profile</h1>
            <p className="mt-1  text-center">
              Welcome! Explore and manage your personal details here.
            </p>
          </div>
        </div>

        <div className="w-[95%] md:w-[80%] lg:w-[50%] mx-auto font-secondary">
          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
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

              <ReadInputBox
                title={"Email Address"}
                register={register}
                filedName={"email"}
                must={true}
                className={"md:text-sm lg:text-base"}
              />
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
              />
            </div>

            <div className="mb-6">
              <div className="mb-2">Gender</div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-base">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="accent-primaryl w-4 h-4 hover:scale-110"
                    {...register("gender")}
                  />
                  <label for="male" className="cursor-pointer">
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
                  <label for="female" className="cursor-pointer">
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
                className="bg-primaryl hover:bg-opacity-90 py-3 text-base w-full font-semibold text-center text-white rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;
