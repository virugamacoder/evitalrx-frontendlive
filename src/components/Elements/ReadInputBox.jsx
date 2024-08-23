import React from "react";

function ReadInputBox({
  title,
  register,
  filedName,
  must,
  className,
  type = "text",
  width = "w-full",
}) {
  return (
    <div className="mb-3">
      {/* Label */}
      <label htmlFor={filedName} className={`block font-normal`}>
        {title} {must ? <sup className="text-red-500 text-base">*</sup> : ""}
      </label>
      {/* Input */}
      <input
        type={type}
        id={filedName}
        name={filedName}
        {...register(filedName)}
        className={`block bg-gray-100  cursor-not-allowed text-gray-500 h-10 ${width} rounded-sm text-black  ring-1 px-2 ring-gray-400 ps-10 focus:ring-gray-400 focus:outline-none focus:border-gray-400 ${className} `}
        readOnly
        disabled
      />

      <div className="h-[2vh] pt-1"></div>
    </div>
  );
}

export default ReadInputBox;
