import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/Users';


const Login = () => {

    const [user, setUser]=useState({});
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {error, loading}=useSelector((state)=>state.auth);

    const loginData=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        const token=localStorage.getItem('token');
        const storedUser=JSON.parse(localStorage.getItem('currentUser'));

        if (token && storedUser){
            navigate('/Books');
        }
    },[navigate])


const handleLogin= async (e)=>{
    e.preventDefault();
    try{
        console.log("submited credential:",user);
        await dispatch(login(user)).unwrap();
        alert("User Login succeed.");
        navigate("/Books");
    }catch(err){
        console.error("Login error:", err);
        alert("User Login failed: " + (err || "Invalid credentials."));
    }
}

  return (
    <div>
            <div>
                <Navbar />

                <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                        {/* Heading */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Login Your Account
                            </h1>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleLogin}>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username or Email
                                </label>

                                <input
                                    type="text" 
                                    name="Email"
                                    onChange={loginData}
                                    placeholder="Enter your username or email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="Password"
                                    onChange={loginData}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            
                            {error && (
                                <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-200">
                                    {error}
                                </p>
                            )}

                            {/* Login Button with loading state handling */}
                            <button
                                type="submit"
                                
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition duration-300"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>

                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Do you want to register?{' '}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                    register
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login
