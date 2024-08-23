import React, { useState } from "react";

function InputBoxLive({
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
  schema,
  setError,
}) {
  const [touched, setTouched] = useState(false);

  const handleKeyDown = (event) => {
    if (type === "number" || type === "tel") {
      // Check if the pressed key is not a number
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
    }
  };

  const handlePaste = (event) => {
    if (type === "number" || type === "tel") {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("text");

      // Check if the pasted data contains only numbers
      if (!/^\d+$/.test(pastedData)) {
        event.preventDefault();
      }
    }
  };

  const handleKeyUp = (event) => {
    if (touched) {
      const value = event.target.value;

      schema
        .validateAt(filedName, { [filedName]: value }) // Validate the field
        .then((valid) => {
          // If the field is valid, remove the error message
          if (errors[filedName]) {
            delete errors[filedName];
          }
          setTouched(false);
        })
        .catch((err) => {
          // If the field is invalid, add the error message
          setError(filedName, { type: "manual", message: err.errors[0] });
          setTouched(true);
        })
        .finally(() => {});
    }
  };

  const handleBlur = (event) => {
    const value = event.target.value;

    if (!value == "") {
      schema
        .validateAt(filedName, { [filedName]: value }) // Validate the field
        .then((valid) => {
          // If the field is valid, remove the error message
          if (errors[filedName]) {
            delete errors[filedName];
          }
          setTouched(false);
        })
        .catch((err) => {
          // If the field is invalid, add the error message
          setError(filedName, { type: "manual", message: err.errors[0] });
          setTouched(true);
        })
        .finally(() => {});
    }
  };

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
        onKeyUp={handleKeyUp}
        onKeyDown={type === "number" || type === "tel" ? handleKeyDown : null}
        onBlur={handleBlur}
        onPaste={handlePaste}
      />

      {/* Error */}
      <div className="h-[2vh] pt-1">
        {errors[filedName] && (
          <p className="text-red-500 text-xs leading-none">
            {errors[filedName].message}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputBoxLive;
