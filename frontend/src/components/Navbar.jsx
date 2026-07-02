import React from "react";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiLogout, logout } from "../features/Users";




const Navbar = () => {
  const navigate=useNavigate();
  const {currentUser}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  //handle login logout action for user while went in book details page
  const authAction=()=>{
    if(currentUser){
      dispatch(apiLogout()||logout());
      navigate("/")
    }else{
      navigate("/User/login");
    }
  };
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-5 h-5 text-indigo-950" />
          <span className="font-serif font-bold text-lg text-indigo-950">
            Scholarly LMS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/"
            className="text-slate-500 hover:border-b-2 border-indigo-950 hover:text-slate-700  pb-[22px] -mb-[22px]"
          >
            Home
          </Link>
          <Link to="/User/login" className="text-slate-500 hover:text-slate-700 hover:border-b-2 pb-[22px] -mb-[22px]"
          >
            Books
          </Link>
          <Link to="/borrow" className="text-slate-500 hover:text-slate-700">
            Logs
          </Link>
        </nav>
        

        <button className={`${
              currentUser ? "bg-red-600 hover:bg-red-700" 
                : "bg-indigo-950 hover:bg-indigo-900"} text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors`}
            onClick={authAction}
          >
            {currentUser ? "Logout" : "Sign In"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;