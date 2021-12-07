import React, { useState, useEffect } from 'react';
import UsersTable from '../components/UsersTable';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import '../css/Home.css';

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
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h4>Teste Engenheiro de Software Full Stack</h4>

        <div className="table-container">
          <div className="buttons-container">

            <button className="button-register" onClick={ () => setRedirectToRegisterPage(true) }>
              Cadastrar
            </button>
            <input type="text" placeholder="Busca" onChange={ (e) => getSearchUsers(e.target.value) } />
            
          </div>

          <br />
          <UsersTable users={ searchUsers } isLoading={ isLoading } setSearchUsers={ setSearchUsers } />
        </div>

      </div>
      { redirectToRegisterPage ? <Navigate to="/cadastrar" /> : null }
    </div>
  );
}

export default Home;
