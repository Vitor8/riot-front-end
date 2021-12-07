import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UsersTable({ users, isLoading, setSearchUsers }) {
  const initialKeys = {
    "_id": false,
    "name": false,
    "age": false,
    "gitHubUser": false
  }
  const [clicked, setClicked] = useState(initialKeys);
  const [headerKey, setHeaderKey] = useState();
  const [keysArray, setKeysArray] = useState([]);
  const [keysArraySort, setKeysArraySort] = useState([]);
  
  function sort(headerKey) {
    setHeaderKey(headerKey);
    let keys = [];
    users.forEach((user) => keys.push(user[`${ headerKey }`]));
    setKeysArray(keys);
    setClicked({
      ...clicked,
      [`${headerKey}`]: !clicked[`${headerKey}`]
    });
  }

  useEffect(() => {
    let keysSort = [];
    if (clicked[`${headerKey}`]) {
      keysSort = keysArray.sort();
    } else {
      keysSort = keysArray.sort().reverse();
    }
    setKeysArraySort(keysSort);
  }, [clicked]);

  useEffect(() => {
    let usersSort = [];
    keysArraySort.forEach((key) => {
      const user = users.find((user) => user[`${headerKey}`] === key);
      usersSort.push(user);
    });
    setSearchUsers(usersSort);
  }, [keysArraySort]);

  return (
    <table> 
      <thead>
        <tr className="table-header-container">
          <th id="_id" onClick={ (e) => sort(e.target.id) } className="table-header-content">ID</th>
          <th id="name" onClick={ (e) => sort(e.target.id) } className="table-header-content">Nome</th>
          <th id="age" onClick={ (e) => sort(e.target.id) } className="table-header-content">Idade</th>
          <th id="gitHubUser" onClick={ (e) => sort(e.target.id) } className="table-header-content">GitHub User</th>
          <th className="table-header-address">Endereço</th>
          <th></th>
        </tr>
      </thead>
      { !isLoading && users.map((user) => <UserCard key={ user._id } user={ user } /> )}
    </table>
  );
}

export default UsersTable;
