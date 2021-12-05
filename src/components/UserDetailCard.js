import React from 'react'
import { Link } from 'react-router-dom';

function UserDetailCard({ user }) {

  function joinAddress() {
    const address = `${user['fullAddress']['logradouro']}, ${user['number']} - ${user['fullAddress'].bairro} - ${user['fullAddress'].localidade}/${user['fullAddress'].uf}`;
    return address;
  }

  return (
    <div>
      <h4>Nome: { user['name'] }</h4>
      <p>Idade: { user['age'] }</p>
      <p>GitHub User: { user['gitHubUser'] }</p>
      <p>Id: { user['_id'] }</p>
      <p>Endereço: { joinAddress() }</p>
      <img src={ user['gitHubData']['avatar'] } alt="avata do usuário" />
      <Link to="/">Volta página Inicial</Link>
    </div>
  )
}

export default UserDetailCard;
