import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loginwithgoogle, register } from "../features/Users";
import { GoogleLogin } from "@react-oauth/google";



const Register = () => {
    const [user, setUser]=useState({});
    const [regerror, setregError]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [clientError, seClientError]=useState(null);
    const {error, loading, currentUser}= useSelector((state)=>state.auth);

    //get user data from the input field and set data in user variable
    const userData=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    //submit create user event
    const submitRegister= async (e)=>{
        e.preventDefault();
        seClientError(null);

        if(!user.FirstName|| !user.LastName|| !user.Email||!user.Password||!user.UserName){
            setregError("All field are required for register!")
            return;
        }
        try{
          await dispatch(register(user)).unwrap();
          alert("User registration is successful.");
          navigate("/User/Login");
        }catch(err){
          console.error("Registration failed:", err);
          alert("Registration failed: " + (err || "Check your details and try again."));
        }
    }


  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
           
          </div>

          {/* Google Sign Up */}
          <div className="flex justify-center w-full mb-6">

            <GoogleLogin
              onSuccess={(res) => {
                dispatch(loginwithgoogle(res.credential));
                navigate("/Books");
              }}
              onError={() => console.log("Google Popup login failed")}

              type="button"
              className="justify-center gap-3 border border-gray-300 rounded-xl py-3 text-gray-700 font-medium hover:bg-gray-50 transition duration-300"
            >
              <FcGoogle className="text-2xl" />
              <span>Sign up with Google</span>
            </GoogleLogin>
          </div>
          

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>

            <span className="px-4 text-sm text-gray-500 font-medium">
              OR
            </span>

            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form className="space-y-5"
          onSubmit={submitRegister}>
            {/* username */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UserName
              </label>

              <input
                type="text"
                name="UserName"
                placeholder="Enter your user name"
                onChange={userData}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>

              <input
                type="text"
                name="FirstName"
                placeholder="Enter your first name"
                onChange={userData}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="LastName"
                onChange={userData}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="Email"
                onChange={userData}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="Password"
                onChange={userData}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            {(clientError||regerror) &&( 
          <p className="text-red-500 mb-3">
            {clientError||regerror}
          </p>)}

            {/* Register Button */}
            <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/User/Login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;