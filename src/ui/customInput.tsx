import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "./input";

interface InputProps {
  label: string;
  type?: string;
  field: any;
  required?: boolean;
}

const CustomInput: React.FC<InputProps> = ({ label, field, required }) => {
  return (
    <div className="w-full relative">
      <input
        className="
        peer 
        w-full
        p-4
        pt-6
        font-light
        bg-primary
        text-primary
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        "
        {...field}
      />
      <label
        className={`
        absolute
        text-md
        text-primary
        duration-150
        transform
        -translate-y-3
        top-5
        left-4
        z-10
        origin-[0]
        peer-placeholder-shown:scale-90
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
            `}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
    </div>
  );
};

export default CustomInput;
