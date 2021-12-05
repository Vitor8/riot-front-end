import React from 'react';
import UserCard from './UserCard';

function UsersTable({ users, isLoading }) {

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
