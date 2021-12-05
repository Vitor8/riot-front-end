import React, { useState, useEffect } from 'react';
import UsersTable from '../components/UsersTable';
import { Navigate } from 'react-router-dom'

function Home() {
  const [redirectToRegisterPage, setRedirectToRegisterPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const token = JSON.parse(localStorage.getItem('token'));

      const rawResponse = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: { 'Authorization': token },
      });

      const json = await rawResponse.json();
      const users = json.users;
      setUsers(users);
      setSearchUsers(users);
      setIsLoading(false);
    };
    getAllUsers();
  }, []);

  function getSearchUsers(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    const usersSearched = users.filter((user) => user['name'].toLowerCase().includes(searchTermLower) || user['gitHubUser'].toLowerCase().includes(searchTermLower));
    setSearchUsers(usersSearched);
  }

  return (
    <div>
      <button onClick={ () => setRedirectToRegisterPage(true) }>Cadastrar</button>
      <input type="text" placeholder="Nome ou GitHub User..." onChange={ (e) => getSearchUsers(e.target.value) } />
      <br />
      <UsersTable users={ searchUsers } isLoading={ isLoading } setSearchUsers={ setSearchUsers } />

      { redirectToRegisterPage ? <Navigate to="/cadastrar" /> : null }
    </div>
  );
}

export default Home;
