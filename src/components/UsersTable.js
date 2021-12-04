import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [hasCheckedSessionStorage, setHasCheckedSessionStorage] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedData);
    setHasCheckedSessionStorage(true);
  },[]);


  return (
    <table> 
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>GitHubUser</th>
          <th>Endereço</th>
        </tr>
      </thead>
      { hasCheckedSessionStorage && users.map((user) => <UserCard key={ user.id } user={ user } /> )}
    </table>
  );
}

export default UsersTable;
