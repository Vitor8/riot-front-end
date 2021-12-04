import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const rawResponse = await fetch('http://localhost:3001/users', {
        method: 'GET',
      });

      const json = await rawResponse.json();
      const users = json.users;
      setUsers(users);
      setIsLoading(false);
    };
    getAllUsers();
  }, []);

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
      { !isLoading && users.map((user) => <UserCard key={ user._id } user={ user } /> )}
    </table>
  );
}

export default UsersTable;
