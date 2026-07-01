import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = () => {
    const {currentUser}= useSelector((state)=>state.auth);

    return currentUser? <Outlet/>:<Navigate to="/" replace/>
 
}

export default ProtectedRouter
