
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button,Label, Spinner, TextInput } from "flowbite-react";

const SignUp = () => {
  const [userData, setuserData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (event) => {
    setuserData({...userData, [event.target.id]:event.target.value.trim()})

  }
  const handlesubmit = async(event) =>{
    event.preventDefault();
    if(!userData.username || !userData.email || !userData.password ){
      return setErrorMessage('please fill out all fields.')
    }
    //backend API call 
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch ('api/auth/signup',{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      const data = await res.json();
      if (data.success === false){
        setErrorMessage(data.message);
        setLoading(false);
      }
      setLoading(false);
      if(res.ok){
        await navigate('/signin');
      }
      
    } catch (error) {
     setErrorMessage(error.message);
     setLoading(false);
    }
  };
  
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
            This is Yadasa's Blog. Come and talk whatever is on your mind. Sign Up to join the conversation.
          </p>
        </div>

        <div className="flex-1">
          {/* Right div */}
          <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
            <div>
              <Label value="Your username" />
              <TextInput autoComplete = 'off'  type="text" name="username" placeholder="Username" id="username" onChange={handlechange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput  autoComplete = 'off' name="email" placeholder="example@company.com" id="email" onChange={handlechange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput autoComplete = 'off'  type="password" name="password" placeholder="Password" id="password" onChange={handlechange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled ={loading} >
              {
                loading?(
                <>
                <Spinner size='sm'/>
                <span className='pl-3'> Loading...</span>
                </>
                ):'Sign Up'
              }

        
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
