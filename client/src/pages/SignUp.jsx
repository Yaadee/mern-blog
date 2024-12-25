
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  const [userData, setuserData] = useState({});
  const handlechange = (event) => {
    setuserData({...userData, [event.target.id]:event.target.value})

  }
  const handlesubmit = async(event) =>{
    event.preventDefault();
    // Add your backend API call here
    try {
      const res = await fetch ('api/auth/signup',{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      if (!res.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }

      const data = await res.json();
      console.log('Signup successful:', data);
    } catch (error) {
      console.error('Error during signup:', error);
    }


  }
  
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
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" name="username" placeholder="Username" id="username" onChange={handlechange}/>
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" name="email" placeholder="example@company.com" id="email" onChange={handlechange}/>
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" name="password" placeholder="Password" id="password" onChange={handlechange}/>
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
