import React from "react";

function InputBox({
  title,
  register,
  filedName,
  errors,
  placeHolder = "",
  className,
  type = "text",
  width = "w-full",
  min,
  max,
  maxLength = "",
  requiredError = true,
}) {
  return (
    <div className="mb-3">
      {/* Label */}
      <label
        htmlFor={filedName}
        className={`block font-normal text-fontColor text-sm mb-2 font-secondary`}
      >
        <p>{title}</p>
      </label>
      {/* Input */}
      <input
        type={type}
        id={filedName}
        name={filedName}
        {...register(filedName)}
        className={` block bg-transparent h-10  ${width} font-secondary rounded-lg  text-black  ring-1 px-2  focus:ring-primaryl focus:outline-none focus:border-rose-600 ${
          errors[filedName] ? "ring-1 ring-red-500" : "ring-gray-300"
        } ${className}`}
        {...(placeHolder
          ? { placeholder: placeHolder }
          : { placeholder: `Type ${title}` })}
        min={min}
        max={max}
        maxLength={maxLength}
      />

      {/* Error */}
      {requiredError && (
        <div className="h-[2vh] pt-1">
          {errors[filedName] && (
            <p className="text-red-500 text-xs leading-none">
              {errors[filedName].message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default InputBox;
