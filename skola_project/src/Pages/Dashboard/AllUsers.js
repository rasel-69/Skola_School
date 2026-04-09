
/*
import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';


const AllUsers = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:8000/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

  
    return (
        <div className="overflow-x-auto mx-16 mt-16">
            <table className="table   table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserRow
                            key={user._id}
                            user={user}
                            index={index}
                            users={users}
                 
                            setUsers={setUsers}
                        />
                    ))}
                </tbody>
            </table>

            
        </div>
    );
};

export default AllUsers;






*/  


import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="overflow-x-auto mx-16 mt-16">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Email</th>
            <th>Teacher ID</th> {/* Added column for Teacher ID */}
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              index={index}
              users={users}
              setUsers={setUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
