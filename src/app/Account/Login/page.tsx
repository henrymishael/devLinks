"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "~/components/common/Input";
import emailIcon from "~/assets/envelop.svg";
import lockIcon from "~/assets/lock.svg";

import Logo from "~/components/common/Logo";
import { Button } from "~/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/request";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in successfully!");
      router.push("/Home/Profile");
    } catch (err: any) {
      console.error("Error logging in user:", err.message);
      // setEmailError(err.message); // Display the error to the user
    }
  };

  return (
    <div className='flex flex-col justify-center items-center bg-background-foreground max-w-8xl min-h-screen gap-[51px]'>
      <Logo size='large' />
      <div className='bg-background rounded-xl p-10 gap-10 flex flex-col xl:w-[476px]'>
        <div>
          <h1 className='heading-m'>{"Login"}</h1>
          <p className='body-m text-secondary-foreground'>
            Add your details below to get back into the app
          </p>
        </div>
        <form className='flex flex-col gap-6' onSubmit={handleLogin}>
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

          <Button className='box' variant={"default"} type='submit'>
            Login
          </Button>

          <p className='body-m text-center text-secondary-foreground '>
            {"Don't have an account?"}{" "}
            <Link href={"/Account/register"}>
              <span className='text-primary'>Create Account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
