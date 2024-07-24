"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "~/components/common/Input";
import emailIcon from "~/assets/envelop.svg";
import lockIcon from "~/assets/lock.svg";

import Logo from "~/components/common/Logo";
import { Button } from "~/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/request";
import { useRouter } from "next/navigation";

type Props = {};

const Register = (props: Props) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Must have at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    if (value !== password) {
      setPasswordConfirmError("Passwords do not match");
    } else {
      setPasswordConfirmError("");
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError || passwordConfirmError) {
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully!");
      router.push("/Home/Profile");
    } catch (err: any) {
      console.error("Error registering user:", err.message);
      // Display the error to the user
      // setEmailError(err.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center bg-background-foreground max-w-8xl min-h-screen pt-6 gap-[51px]'>
      <Logo size='large' />
      <div className='bg-background rounded-xl p-10 gap-10 flex flex-col xl:w-[476px]'>
        <div>
          <h1 className='heading-m'>{"Create account"}</h1>
          <p className='body-m text-secondary-foreground'>
            {"Let's get you started sharing your links!"}
          </p>
        </div>
        <form className='flex flex-col gap-6' onSubmit={handleSignUp}>
          <Input
            label='Email'
            name='email'
            src={emailIcon}
            type='email'
            value={email}
            placeholder='e.g. alex@gmail.com'
            error={emailError}
            onChange={handleEmailChange}
          />
          <Input
            label='Password'
            name='password'
            src={lockIcon}
            type='password'
            value={password}
            placeholder='Enter your password'
            error={passwordError}
            onChange={handlePasswordChange}
          />
          <Input
            label='Confirm Password'
            name='passwordConfirm'
            src={lockIcon}
            type='password'
            value={passwordConfirm}
            placeholder='Confirm your password'
            error={passwordConfirmError}
            onChange={handlePasswordConfirmChange}
          />

          <p className='body-s text-secondary-foreground'>
            Password must contain at least 8 characters
          </p>

          <Button className='box' variant={"default"} type='submit'>
            Create Account
          </Button>

          <p className='body-m text-center text-secondary-foreground '>
            {"Already have an account?"}{" "}
            <Link href={"/Account/Login"}>
              <span className='text-primary'>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
