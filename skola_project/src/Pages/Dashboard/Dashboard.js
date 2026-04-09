import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';


const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const [userLoaded, setUserLoaded] = useState(false);
    const [admin] = useAdmin(user)

    useEffect(() => {
        if (!loading) {
            setUserLoaded(true);
        }
    }, [loading]);

    if (loading || !userLoaded) {
        // Return loading indicator or null while authentication state is being fetched
        return null;
    }




    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <h2 className='text-5xl text-blue-500 text-center'>Dashboard</h2>
                <h2 className='text-xl text-orange-500 text-center'>{user?.email}</h2>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                    {/* Sidebar content here */}
                   { !admin&& <li><Link to="/dashboard">Assignments</Link></li>}
                    <li><Link to="/dashboard/review">My Review</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>

                    {admin && <li><Link to="/dashboard/allusers">All Users</Link></li>}
                    {admin && <li><Link to="/dashboard/adminviewassignments">All Teachers' Assignments</Link></li>}
                    {admin && <li><Link to="/dashboard/adminviewattendance">All Attendance Records</Link></li>}

                    <li><Link to="/dashboard/addproduct">Add Product</Link></li>
                    <li><Link to="/dashboard/manageproduct">Manage Products</Link></li>
                    <li className='text-green-500'><Link to="/dashboard/calender">Calender </Link></li>


                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
