import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <button onClick={fetchUsers}>Refresh</button>
      {users.map(user => (
        <div key={user.id} style={{ border: '1px solid black', margin: '10px' }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
