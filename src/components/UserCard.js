import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function UserCard({ user }) {
  const [redirectToUpdatePage, setRedirectToUpdatePage] = useState(false);
  const [redirectToDetailPage, setRedirectToDetailPage] = useState(false);

  function joinAddress() {
    const address = `${user.fullAddress.logradouro}, ${user.number} - ${user.fullAddress.bairro} - ${user.fullAddress.localidade}/${user.fullAddress.uf}`;
    return address;
  }

  async function deleteUser(userId) {
    const token = JSON.parse(localStorage.getItem('token'));
    const rawResponse = await fetch(`http://localhost:3001/user/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': token },
    });
    
    const content = await rawResponse.json();
    document.location.reload();
  
    console.log(content);
  }

  function confirmDelete() {
    const confirm = window.confirm('Deseja apagar esta linha ?');
    if (confirm) deleteUser(user._id);
    return null;
  }

  function saveUserIdToUpdate() {
    localStorage.setItem('userIdToUpdate', JSON.stringify(user._id));
    setRedirectToUpdatePage(true);
  }

  function saveUserIdToDetailPage() {
    sessionStorage.setItem('userIdToDetailPage', JSON.stringify(user._id));
    setRedirectToDetailPage(true);
  }

  return (
    <tbody>
      <tr>
        <td>{ user._id }</td>
        <td>{ user.name }</td>
        <td>{ user.age }</td>
        <td>{ user['gitHubUser'] }</td>
        <td>
          { joinAddress() } 
          <button onClick={ () => confirmDelete() }>D</button>
          <button onClick={ () => saveUserIdToUpdate() }>A</button>
          <button onClick={ () => saveUserIdToDetailPage() }>V</button>
        </td>
      </tr>
      { redirectToUpdatePage && <Navigate to='/atualizar' /> }
      { redirectToDetailPage && <Navigate to='/detalhes'/> }
    </tbody>
  );
}

export default UserCard;
