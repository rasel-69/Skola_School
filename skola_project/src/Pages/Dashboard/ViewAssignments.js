/*

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AssignRow from './AssignRow';

const ViewAssignments = () => {
    const [user, loading] = useAuthState(auth);
    const [assignments, setAssignments] = useState([]);
    const [searchDay, setSearchDay] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await fetch(`http://localhost:8000/assignments/${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await response.json();
            setAssignments(data);
        };

        if (user) {
            fetchAssignments();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    // Get the current date and day in Bangladesh
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
    const currentDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Dhaka' }).format(new Date());

    // If searchDay is empty, default to the current day
    const dayToFilter = searchDay || currentDay;

    // Filter assignments based on the search day or current day if searchDay is empty
    const filteredAssignments = assignments.filter(assignment =>
        assignment.day.toLowerCase() === dayToFilter.toLowerCase()
    );

    return (
        <div>
        
           <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
                <h2 className="mb-4 lg:mb-0">Your Assignments for {currentDate}</h2>
                <div className='w-60'>
                    <input
                        type="text"
                        placeholder="Search by day(e.g. Monday)"
                        value={searchDay}
                        onChange={(e) => setSearchDay(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 rounded-sm outline-none"
                    />
                </div>
            </div>

            <table className="table table-zebra table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Action</th>
                        <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignRow
                                key={index}
                                index={index}
                                assignment={assignment}
                                isAdmin={false}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No assignments found for {dayToFilter}</td>
                        </tr>
                    )}
                </tbody>
            </table>  
        </div>
    );
};

export default ViewAssignments;


*/ 

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AssignRow from './AssignRow';

const ViewAssignments = () => {
    const [user, loading] = useAuthState(auth);
    const [assignments, setAssignments] = useState([]);
    const [searchDay, setSearchDay] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const userData = await response.json();
                setIsAdmin(userData.isAdmin); // Assuming 'isAdmin' is a boolean property in user data
            } catch (error) {
                console.error("Failed to fetch admin status", error);
            }
        };

        const fetchAssignments = async () => {
            try {
                const response = await fetch(`http://localhost:8000/assignments/${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error("Failed to fetch assignments", error);
            }
        };

        if (user) {
            checkAdminStatus();
            fetchAssignments();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    // Get the current date and day in Bangladesh
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
    const currentDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Dhaka' }).format(new Date());

    // If searchDay is empty, default to the current day
    const dayToFilter = searchDay || currentDay;

    // Filter assignments based on the search day or current day if searchDay is empty
    const filteredAssignments = assignments.filter(assignment =>
        assignment.day.toLowerCase() === dayToFilter.toLowerCase()
    );

    return (
        <div>
            <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
                <h2 className="mb-4 lg:mb-0">Your Assignments for {currentDate}</h2>
                <div className='w-60'>
                    <input
                        type="text"
                        placeholder="Search by day(e.g. Monday)"
                        value={searchDay}
                        onChange={(e) => setSearchDay(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 rounded-sm outline-none"
                    />
                </div>
            </div>

            <table className="table table-zebra table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Action</th>  
                        <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignRow
                                key={index}
                                index={index}
                                assignment={assignment}
                                isAdmin={isAdmin}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No assignments found for {dayToFilter}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAssignments;
