/*

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AssignRow from './AssignRow';

const AdminViewAssignments = () => {
    const [user, loading] = useAuthState(auth);
    const [assignments, setAssignments] = useState([]);
    const [searchDay, setSearchDay] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/allAssignments', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
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

    console.log(filteredAssignments)

    return (
        <div>
            <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
                <h2 className="mb-4 lg:mb-0 text-2xl">Assignments for {currentDate} </h2>
                <div className='w-60'>
                    <input
                        type="text"
                        placeholder="Search by day (e.g., Monday)"
                        value={searchDay}
                        onChange={(e) => setSearchDay(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 rounded-sm outline-none"
                    />
                </div>
            </div>

            <table className="table table-pin-rows table-pin-cols font-semibold">
                <thead>
                    <tr>
                        <th>Teacher Email</th>
                        <th>Teacher Name</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignRow
                                key={index}
                                assignment={assignment}
                                isAdmin={true}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No assignments found for {dayToFilter}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminViewAssignments;


*/  


/* this admin view assignment ager ta 
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AssignRow from './AssignRow';

const AdminViewAssignments = () => {
    const [user, loading] = useAuthState(auth);
    const [assignments, setAssignments] = useState([]);
    const [searchDay, setSearchDay] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/allAssignments', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
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

    console.log(filteredAssignments);

    return (
        <div>
            <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
                <h2 className="mb-4 lg:mb-0 text-2xl">Assignments for {currentDate}</h2>
                <div className='w-60'>
                    <input
                        type="text"
                        placeholder="Search by day (e.g., Monday)"
                        value={searchDay}
                        onChange={(e) => setSearchDay(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 rounded-sm outline-none"
                    />
                </div>
            </div>

            <table className="table table-pin-rows table-pin-cols font-semibold">
                <thead>
                    <tr>
                        <th>Teacher Email</th>
                        <th>Teacher Name</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                        {true && <th>Completed</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignRow
                                key={index}
                                assignment={assignment}
                                isAdmin={true}
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

export default AdminViewAssignments;




*/



import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AssignRow from './AssignRow';

const AdminViewAssignments = () => {
    const [user, loading] = useAuthState(auth);
    const [assignments, setAssignments] = useState([]);
    const [searchDay, setSearchDay] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/allAssignments', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        if (user) {
            fetchAssignments();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' };
    const currentDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Dhaka' }).format(new Date());

    const dayToFilter = searchDay || currentDay;

    const filteredAssignments = assignments.filter(assignment =>
        assignment.day.toLowerCase() === dayToFilter.toLowerCase()
    );

    return (
        <div>
            <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
                <h2 className="mb-4 lg:mb-0 text-2xl">Assignments for {currentDate}</h2>
                <div className='w-60'>
                    <input
                        type="text"
                        placeholder="Search by day (e.g., Monday)"
                        value={searchDay}
                        onChange={(e) => setSearchDay(e.target.value)}
                        className="input input-bordered w-full max-w-xs mb-4 lg:mb-0 rounded-sm outline-none"
                    />
                </div>
            </div>

            <table className="table table-zebra  table-pin-rows table-pin-cols font-semibold">
                <thead>
                    <tr>
                        <th>Teacher Email</th>
                        <th>ID</th>
                        <th>Teacher Name</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Completed</th>
                        <th>Uncompleted</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssignments.length > 0 ? (
                        filteredAssignments.map((assignment, index) => (
                            <AssignRow
                                key={index}
                                assignment={assignment}
                                isAdmin={true}
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

export default AdminViewAssignments;
