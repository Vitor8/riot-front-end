import React, { useEffect, useState } from 'react';
import UserDetailCard from '../components/UserDetailCard';
import Header from '../components/Header';

function Detalhes() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserById = async () => {
      const userId = JSON.parse(sessionStorage.getItem('userIdToDetailPage'));
      const token = JSON.parse(localStorage.getItem('token'));

      const rawResponse = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': token },
      });
      
      const user = await rawResponse.json();
      setUser(user['user']);
      setIsLoading(false);
    };
    
    getUserById();
  }, []);

  return (
    <div>
      <Header />
      { !isLoading && <UserDetailCard user={ user } /> }
    </div>
  )
}

export default Detalhes;
