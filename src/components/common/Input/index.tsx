"use client";

import Image from "next/image";

import React, { useState, InputHTMLAttributes, useEffect } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  src: string;
  error?: string;
  label?: string;
  type: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  src,
  error,
  onChange,
  type,
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e); // Call the passed onChange handler
  };

  const isFilled = value !== "";
  const hasError = !!error;

  return (
    <div className='w-full'>
      {label && <label className='block mb-1 body-s'>{label}</label>}
      <div
        className={`relative body-m flex items-center px-4 py-3 border w-[396px] ${
          hasError ? "border-red-500" : "border-gray-300"
        } rounded-lg ${isFocused ? "border-primary" : ""}`}
      >
        <div className='absolute'>
          <Image src={src} alt='Icon' className='w-4 h-4' />
        </div>
        <input
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          name={name}
          className={`pl-8 w-full outline-none caret-primary caret ${
            isFilled ? "text-black" : "text-gray-500"
          }`}
        />
        {hasError && (
          <span className='absolute right-2 text-red-500 text-xs'>{error}</span>
        )}
      </div>
    </div>
  );
};

// const EmailInput: React.FC = () => {
//   const [error, setError] = useState("");

//   const validateEmail = (value: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(value)) {
//       setError("Invalid email address");
//     } else {
//       setError("");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     validateEmail(e.target.value);
//   };

//   return (
//     <Input
//       label='Email'
//       src={emailIcon}
//       type='email'
//       placeholder='e.g. alex@gmail.com'
//       error={error}
//       onChange={handleChange}
//     />
//   );
// };

// const PasswordInput: React.FC = () => {
//   const [error, setError] = useState("");

//   const validatePassword = (value: string) => {
//     if (value.length < 8) {
//       setError("Password must be at least 8 characters long");
//     } else {
//       setError("");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     validatePassword(e.target.value);
//   };

//   return (
//     <Input
//       label='Password'
//       src={lockIcon}
//       type='password'
//       placeholder='Enter your password'
//       error={error}
//       onChange={handleChange}
//     />
//   );
// };

export { Input };
