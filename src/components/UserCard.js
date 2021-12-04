import React, { useState } from 'react';

function UserCard({ user }) {

  function joinAddress() {
    const address = `${user.fullAddress.logradouro}, ${user.number} - ${user.fullAddress.bairro} - ${user.fullAddress.localidade}/${user.fullAddress.uf}`;

    return address;
  }

  return (
    <tbody>
      <tr>
        <td>{ user.id }</td>
        <td>{ user.name }</td>
        <td>{ user.age }</td>
        <td>{ user['github-user'] }</td>
        <td>{ joinAddress() }</td>
      </tr>
    </tbody>
  );
}

export default UserCard;
