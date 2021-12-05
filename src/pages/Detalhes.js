import React, { useEffect, useState } from 'react';
import UserDetailCard from '../components/UserDetailCard';

function Detalhes() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserById = async () => {
      const userId = JSON.parse(sessionStorage.getItem('userIdToDetailPage'));
      const rawResponse = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
      });
      const user = await rawResponse.json();
      setUser(user['user']);
      setIsLoading(false);
    };
    
    getUserById();
  }, []);

  return (
    <div>
      { !isLoading && <UserDetailCard user={ user } /> }
    </div>
  )
}

export default Detalhes;
