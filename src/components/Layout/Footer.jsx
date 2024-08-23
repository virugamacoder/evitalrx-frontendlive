import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="relative w-full flex-col bg-[#496989] flex items-center justify-center overflow-x-hidden">
      <div className="my-2">
        <div className="flex items-center gap-4">
          <NavLink to="https://github.com/virugamacoder" target="_blank">
            <div className="bg-slate-50 rounded-full cursor-pointer text-lg p-1 hover:bg-secondary hover:text-white ">
              <IoLogoGithub />
            </div>
          </NavLink>
          <NavLink
            to="https://www.linkedin.com/in/virugamacoder/"
            target="_blank"
          >
            <div className="  bg-slate-50  rounded-full cursor-pointer hover:bg-secondary hover:text-white text-lg p-1 ">
              <FaLinkedin />
            </div>
          </NavLink>
          <NavLink to="https://x.com/virugamacoder" target="_blank">
            <div className="  bg-slate-50  rounded-full cursor-pointer hover:bg-secondary hover:text-white text-lg p-1">
              <FaXTwitter />
            </div>
          </NavLink>
        </div>
      </div>
      <hr className="w-[85%]  mb-0 border-1 border-white/20" />

      <div className="w-full text-white my-2 text-center">Krunal Virugama</div>
    </div>
  );
}

export default Footer;
