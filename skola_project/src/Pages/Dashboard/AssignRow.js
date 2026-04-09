import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DateTime } from 'luxon';

const AssignRow = ({ assignment, isAdmin }) => {
    const { teacherEmail, teacherId, className, classTime, subject, day, teacherName } = assignment;
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [absenceReason, setAbsenceReason] = useState('');
    const [fetchedAbsenceReason, setFetchedAbsenceReason] = useState('');

    useEffect(() => {
        const attendanceKey = `${teacherEmail}-${classTime}-${className}-${day}`;
        const markedAttendance = localStorage.getItem(attendanceKey);
        const today = new Date().toISOString().split('T')[0];

        if (markedAttendance === today) {
            setAttendanceMarked(true);
        }
    }, [teacherEmail, classTime, className, day]);

    const markAttendance = async () => {
        try {
            const now = DateTime.now().setZone('Asia/Dhaka');
            const currentDay = now.toFormat('cccc');

            if (currentDay.toLowerCase() !== day.toLowerCase()) {
                toast.error('Attendance can only be marked on the scheduled day.');
                return;
            }

            const [startTime, endTime] = classTime.split(' - ').map(time => DateTime.fromFormat(time, 'h:mm a', { zone: 'Asia/Dhaka' }));

            if (now < startTime || now > endTime) {
                toast.error('Attendance can only be marked during the scheduled class time.');
                return;
            }

            const response = await fetch('http://localhost:8000/markAttendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ teacherEmail, teacherId, classTime, className, day, subject, teacherName })
            });

            const data = await response.json();
            if (data.success) {
                const attendanceKey = `${teacherEmail}-${classTime}-${className}-${day}`;
                const today = new Date().toISOString().split('T')[0];
                localStorage.setItem(attendanceKey, today);
                setAttendanceMarked(true);
                toast.success('Attendance marked successfully');
            } else {
                toast.error('Failed to mark attendance');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            toast.error('Failed to mark attendance');
        }
    };

    const submitAbsenceReason = async () => {
        try {
            const response = await fetch('http://localhost:8000/markAbsence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ teacherEmail, teacherId, classTime, className, day, subject, teacherName, absenceReason })
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Absence reason submitted successfully');
                setShowModal(false);
            } else {
                toast.error('Failed to submit absence reason');
            }
        } catch (error) {
            console.error('Error submitting absence reason:', error);
            toast.error('Failed to submit absence reason');
        }
    };

    const fetchAbsenceReason = async () => {
        try {
            const response = await fetch('http://localhost:8000/allAbsences', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            const absences = await response.json();
            const foundAbsence = absences.find(absence => 
                absence.teacherEmail === teacherEmail &&
                absence.classTime === classTime &&
                absence.className === className &&
                absence.day.toLowerCase() === day.toLowerCase()
            );

            if (foundAbsence) {
                setFetchedAbsenceReason(foundAbsence.absenceReason);
            } else {
                setFetchedAbsenceReason('');
            }
        } catch (error) {
            console.error('Error fetching absence reason:', error);
            setFetchedAbsenceReason('Error fetching reason');
        }
    };

    return (
        <>
            <tr className="hover:bg-slate-100 transition duration-700">
                {isAdmin && <td>{teacherEmail}</td>}
                <td>{teacherId}</td>
                {isAdmin && <td>{teacherName}</td>}
                <td>{classTime}</td>
                <td>{subject}</td>
                <td>{className}</td>

                {isAdmin && (
                    <td>
                        <input
                            type="checkbox"
                            checked={attendanceMarked}
                            className={`checkbox ${attendanceMarked ? 'checkbox-success' : ''}`}
                            readOnly
                        />
                    </td>
                )}

                {isAdmin && (
                    <td>
                        <button
                            className={`btn btn-sm ${fetchedAbsenceReason ? 'btn-error' : ''}`}
                            onClick={() => {
                                setShowModal(true);
                                fetchAbsenceReason();
                            }}
                        >
                            Check Reason
                        </button>
                    </td>
                )}

                <td>
                    {!isAdmin && (
                        <button
                            onClick={markAttendance}
                            className={`btn btn-xs ${attendanceMarked ? 'btn-success' : 'btn-error'} text-white hover:-translate-y-1 transition duration-700`}
                            disabled={attendanceMarked}
                        >
                            {attendanceMarked ? 'Present' : 'Mark Present'}
                        </button>
                    )}
                </td>

                <td>
                    {!isAdmin && (
                        <button
                            className="btn btn-sm text-white btn-error"
                            onClick={() => setShowModal(true)}
                        >
                            Absent
                        </button>
                    )}
                </td>
            </tr>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Reason for Absence</h3>
                        {isAdmin ? (
                            <p className='mt-6 text-red-500 font-bold'>{fetchedAbsenceReason || 'No reason found'}</p>
                        ) : (
                            <>
                                <textarea
                                    className="textarea textarea-accent w-full"
                                    placeholder="Enter your reason for absence"
                                    value={absenceReason}
                                    onChange={(e) => setAbsenceReason(e.target.value)}
                                />
                                <div className="modal-action">
                                    <button
                                        className="btn"
                                        onClick={submitAbsenceReason}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )}
                        <button
                            className="btn mt-9"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssignRow;
