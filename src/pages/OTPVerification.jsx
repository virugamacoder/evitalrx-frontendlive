import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { signUpVerifyOtpAPI } from "../constants/API";
import Layout from "../components/Layout/Layout";
import Loading from "../components/Elements/Loading";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [load, setLoad] = useState(false);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const inputsRef = useRef([]);

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index > 0 && !inputsRef.current[index].value) {
        inputsRef.current[index - 1].focus();
      } else {
        inputsRef.current[index].value = "";
      }
    }
  };

  const handleInput = (e, index) => {
    if (e.target.value) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      } else {
        inputsRef.current[index].blur();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${inputsRef.current.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    inputsRef.current.forEach((input, index) => (input.value = digits[index]));
    inputsRef.current[inputsRef.current.length - 1].blur();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = inputsRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      setOtpError("Invalid OTP. Please enter a 6-digit OTP.");
      return;
    }
    console.log("Entered OTP:", otp);
    setLoad(true);

    const data = {
      email,
      otp,
    };

    try {
      const response = await axios.post(signUpVerifyOtpAPI, data);
      console.log(response);

      if (response.status === 201) {
        toast.success(response.data.message, { duration: 4000 });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error.response.data.message, { duration: 4000 });
    } finally {
      setLoad(false);
    }
  };

  return (
    <Layout>
      <Loading load={load} />
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your email.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={handleFocus}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <div className="h-[2vh] pt-1">
            {otpError && (
              <p className="text-red-500 text-xs  leading-none">{otpError}</p>
            )}
          </div>

          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primaryl px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-opacity-85 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default OTPVerification;
