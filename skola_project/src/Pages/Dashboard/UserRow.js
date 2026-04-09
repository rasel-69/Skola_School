
/*
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRow = ({ user, index, setDeletingUser, users, setUsers }) => {
    const { email, role } = user;

    const makeAdmin = () => {
        fetch(`http://localhost:8000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                setUsers(users.map(u => (u.email === email ? { ...u, role: 'admin' } : u)));
                toast.success('Successfully made an admin');
            } else {
                toast.error('Failed to make admin');
            }
        });
    }

    return (
        <tr className="hover:bg-slate-100 transition duration-700">
            <td>{index + 1}</td>
            <td>{email}</td>
            <td>
                {role === "admin" ? "Admin" : <button onClick={makeAdmin} className="btn btn-success btn-xs">Make Admin</button>}
            </td>
            <td>
                <Link className='btn btn-success btn-xs' to="/assign">Assign</Link>
            </td>
            <td>
                <label onClick={() => setDeletingUser(user)} htmlFor='delete-user-confirm-modal' className='btn btn-xs btn-error text-white hover:-translate-y-1 transition duration-700'>
                    Remove
                </label>
            </td>
        </tr>
    );
};

export default UserRow;       */  







import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRow = ({ user, index, setDeletingUser, users, setUsers }) => {
  const { email, role, teacherId } = user;

  const makeAdmin = () => {
    fetch(`http://localhost:8000/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.modifiedCount > 0) {
        setUsers(users.map(u => (u.email === email ? { ...u, role: 'admin' } : u)));
        toast.success('Successfully made an admin');
      } else {
        toast.error('Failed to make admin');
      }
    });
  }

  return (
    <tr className="hover:bg-slate-100 transition duration-700">
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>{teacherId}</td> {/* Display Teacher ID */}
      <td>
        {role === "admin" ? "Admin" : <button onClick={makeAdmin} className="btn btn-success btn-xs">Make Admin</button>}
      </td>
      <td>
        <Link className='btn btn-success btn-xs' to="/assign">Assign</Link>
      </td>
      <td>
        <label onClick={() => setDeletingUser(user)} htmlFor='delete-user-confirm-modal' className='btn btn-xs btn-error text-white hover:-translate-y-1 transition duration-700'>
          Remove
        </label>
      </td>
    </tr>
  );
};

export default UserRow;
