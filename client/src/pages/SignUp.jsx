
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row p-3 max-w-3xl mx-auto gap-5 md:items-center">
        <div className="flex-1">
          {/* Left div */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Yadasa's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is Yadasa's Blog. Come and talk about whatever is on your mind.
          </p>
        </div>

        <div className="flex-1">
          {/* Right div */}
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" name="username" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="text" name="email" placeholder="example@company.com" id="email" />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="text" name="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
