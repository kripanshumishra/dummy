import React,{ useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet,useLocation } from 'react-router-dom';

function PersistentUser() {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    let id ; // usecontext se id 
    const token = sessionStorage.getItem('token')
    if( token ){
        return <Outlet />
    }
    else
        return <Navigate to={'/admin/login'} state={{ from : location.pathname }} />
}

export default PersistentUser