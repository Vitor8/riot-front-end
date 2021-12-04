import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function UserCard({ user }) {
  const [redirectToUpdatePage, setRedirectToUpdatePage] = useState(false);

  function joinAddress() {
    const address = `${user.fullAddress.logradouro}, ${user.number} - ${user.fullAddress.bairro} - ${user.fullAddress.localidade}/${user.fullAddress.uf}`;
    return address;
  }

  function deleteUser(userId) {
    const savedData = JSON.parse(localStorage.getItem('users'));
    const newDataAfterDelete = savedData.filter((user) => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(newDataAfterDelete));
    document.location.reload();
  }

  function confirmDelete() {
    const confirm = window.confirm('Deseja apagar esta linha ?');
    if (confirm) deleteUser(user.id);
    return null;
  }

  function saveUserIdToUpdate() {
    localStorage.setItem('userIdToUpdate', JSON.stringify(user.id));
    setRedirectToUpdatePage(true);
  }

  return (
    <tbody>
      <tr>
        <td>{ user.id }</td>
        <td>{ user.name }</td>
        <td>{ user.age }</td>
        <td>{ user['github-user'] }</td>
        <td>
          { joinAddress() } 
          <button onClick={ () => confirmDelete() }>D</button>
          <button onClick={ () => saveUserIdToUpdate() }>A</button>
        </td>
      </tr>
      { redirectToUpdatePage && <Navigate to='/atualizar' /> }
    </tbody>
  );
}

export default UserCard;
