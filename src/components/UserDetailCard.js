import React from 'react'
import { Link } from 'react-router-dom';

import '../css/Detalhes.css';

function UserDetailCard({ user }) {

  function joinAddress() {
    const address = `${user['fullAddress']['logradouro']}, ${user['number']} - ${user['fullAddress'].bairro} - ${user['fullAddress'].localidade}/${user['fullAddress'].uf}`;
    return address;
  }

  return (
    <div className="detail-container">
      <div>
        <h4>Nome: { user['name'] }</h4>
        <p>Idade: { user['age'] }</p>
        <p>GitHub User: { user['gitHubUser'] }</p>
        <p>Id: { user['_id'] }</p>
        <p>Endereço: { joinAddress() }</p>
        <Link to="/home">Volta página Inicial</Link>
      </div>

      <div>
        <img src={ user['gitHubData']['avatar'] } alt="avata do usuário" width="200px" height="200px" />
      </div>
    </div>
  )
}

export default UserDetailCard;
