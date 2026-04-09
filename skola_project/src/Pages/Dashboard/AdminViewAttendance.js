
/*
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const AdminViewAttendance = () => {
  const [user, loading] = useAuthState(auth);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
 
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch('http://localhost:8000/allAttendance', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await response.json();
        if (data.success !== false) {
          setAttendanceRecords(data);
        } else {
          console.error('Failed to fetch attendance records:', data.message);
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    if (user) {
      fetchAttendanceRecords();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const uniqueRecords = [...new Set(attendanceRecords.map(record => JSON.stringify(record)))].map(str => JSON.parse(str));

  return (
    <div>
      <h2 className="text-2xl mb-4">All Attendance Records</h2>
      <table className="table table-zebra table-pin-cols font-semibold">
        <thead>
          <tr>
            <th>Teacher Email</th>
            <th>ID</th>
            <th>Teacher Name</th>
            <th>Class Time</th>
            <th>Class Name</th>
            <th>Day</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {uniqueRecords.length > 0 ? (
            uniqueRecords.map((record, index) => (
              <tr key={index} className="hover:bg-slate-100 transition duration-700">
                <td>{record.teacherEmail}</td>
                <td>{record.teacherId}</td>
                <td>{record.teacherName}</td>
                <td>{record.classTime}</td>
                <td>{record.className}</td>
                <td>{record.day}</td>
                <td>{record.subject}</td>
                <td>{new Date(record.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No attendance records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewAttendance;
*/

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const AdminViewAttendance = () => {
  const [user, loading] = useAuthState(auth);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAttendanceRecords = async (teacherId = '') => {
    try {
      const response = await fetch(`http://localhost:8000/allAttendance${teacherId ? `?teacherId=${teacherId}` : ''}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      if (data.success !== false) {
        setAttendanceRecords(data);
      } else {
        console.error('Failed to fetch attendance records:', data.message);
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAttendanceRecords(searchTerm);
    }
  }, [user, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>

      <div className='flex flex-col items-center justify-between pr-5 lg:flex-row lg:items-center lg:justify-between'>
        <h2 className="text-2xl mb-4">All Attendance Records</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Teacher ID"
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table className="table table-zebra table-pin-cols font-semibold">
        <thead>
          <tr>
            <th>Teacher Email</th>
            <th>ID</th>
            <th>Teacher Name</th>
            <th>Class Time</th>
            <th>Class Name</th>
            <th>Day</th>
            <th>Subject</th>
            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <tr key={index} className="hover:bg-slate-100 transition duration-700">
                <td>{record.teacherEmail}</td>
                <td>{record.teacherId}</td>
                <td>{record.teacherName}</td>
                <td>{record.classTime}</td>
                <td>{record.className}</td>
                <td>{record.day}</td>
                <td>{record.subject}</td>
                <td>{new Date(record.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No attendance records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewAttendance;
