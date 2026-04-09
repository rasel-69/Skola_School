
/*** This code is perfect  
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Assign = () => {
    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherId, setTeacherId] = useState(''); // New state for teacher ID
    const [classTime, setClassTime] = useState('');
    const [className, setClassName] = useState('');
    const [day, setDay] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherName, setTeacherName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignment = { teacherEmail, classTime, className, day, subject ,teacherName };
        const response = await fetch('http://localhost:8000/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(assignment)
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Assignment created successfully');
            setTeacherEmail('');
            setTeacherId(''); // Reset teacher ID
            setClassTime('');
            setClassName('');
            setDay('');
            setSubject('');
            setTeacherName('');
        } else {
            toast.error(`Failed to create assignment: ${data.message}`);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!admin) {
        return <div>Access denied. Admins only.</div>;
    }
    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div className='flex mt-20 justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400 my-4">Assign Teacher</h2>
                    <form className='text-orange-600' onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="email"
                                placeholder="Enter Teacher Email"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherEmail}
                                onChange={(e) => setTeacherEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="text"
                                placeholder="Enter Teacher ID (e.g., skola01202301)"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherId}
                                onChange={(e) => setTeacherId(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Teacher Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={classTime}
                                onChange={(e) => setClassTime(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Class Time</option>
                                <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                                <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                <option value="10:00 PM - 11:00 PM">10:40 PM - 10:54 PM</option>
                                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                                <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                                <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
                                <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter class Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Subject Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </label>

                        <button className='btn mb-2 w-full max-w-xs text-white btn-neutral mt-4' type="submit">Assign</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Assign;
  */    

/*
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Assign = () => {
    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherId, setTeacherId] = useState(''); // New state for teacher ID
    const [classTime, setClassTime] = useState('');
    const [className, setClassName] = useState('');
    const [day, setDay] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherName, setTeacherName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignment = { teacherEmail, teacherId, classTime, className, day, subject, teacherName };
        const response = await fetch('http://localhost:8000/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(assignment)
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Assignment created successfully');
            setTeacherEmail('');
            setTeacherId(''); // Reset teacher ID
            setClassTime('');
            setClassName('');
            setDay('');
            setSubject('');
            setTeacherName('');
        } else {
            toast.error(`Failed to create assignment: ${data.message}`);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!admin) {
        return <div>Access denied. Admins only.</div>;
    }
    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div className='flex mt-20 justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400 my-4">Assign Teacher</h2>
                    <form className='text-orange-600' onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="email"
                                placeholder="Enter Teacher Email"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherEmail}
                                onChange={(e) => setTeacherEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="text"
                                placeholder="Enter Teacher ID (e.g., skola01202301)"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherId}
                                onChange={(e) => setTeacherId(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Teacher Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={classTime}
                                onChange={(e) => setClassTime(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Class Time</option>
                                <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                                <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                <option value="10:00 PM - 11:00 PM">10:40 PM - 10:54 PM</option>
                                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                                <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                                <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
                                <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter class Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Subject Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </label>

                        <button className='btn mb-2 w-full max-w-xs text-white btn-neutral mt-4' type="submit">Assign</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Assign;
  */  


import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Shared/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Assign = () => {
    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherId, setTeacherId] = useState(''); // New state for teacher ID
    const [classTime, setClassTime] = useState('');
    const [className, setClassName] = useState('');
    const [day, setDay] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherName, setTeacherName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const assignment = { teacherEmail, teacherId, classTime, className, day, subject, teacherName };
        const response = await fetch('http://localhost:8000/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(assignment)
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Assignment created successfully');
            setTeacherEmail('');
            setTeacherId(''); // Reset teacher ID
            setClassTime('');
            setClassName('');
            setDay('');
            setSubject('');
            setTeacherName('');
        } else {
            toast.error(`Failed to create assignment: ${data.message}`);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!admin) {
        return <div>Access denied. Admins only.</div>;
    }
    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div className='flex mt-20 justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl text-primary-content">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center text-orange-400 my-4">Assign Teacher</h2>
                    <form className='text-orange-600' onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="email"
                                placeholder="Enter Teacher Email"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherEmail}
                                onChange={(e) => setTeacherEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                type="text"
                                placeholder="Enter Teacher ID (e.g., skola01202301)"
                                className="input input-bordered w-full max-w-xs"
                                value={teacherId}
                                onChange={(e) => setTeacherId(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Teacher Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={classTime}
                                onChange={(e) => setClassTime(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Class Time</option>
                                <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                                <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                <option value="10:40 PM - 10:54 PM">10:40 PM - 10:54 PM</option>
                                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                                <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                                <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
                                <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter class Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Day</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                            </select>
                        </label>

                        <label className="form-control w-full max-w-xs pb-2">
                            <input
                                placeholder="Enter Subject Name"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </label>

                        <button className='btn mb-2 w-full max-w-xs text-white btn-neutral mt-4' type="submit">Assign</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Assign;




