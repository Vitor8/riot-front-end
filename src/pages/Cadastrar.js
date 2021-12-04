import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'

function Cadastrar() {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [fullAddress, setFullAddress] = useState({});

  async function fetchGitHub() {
    const user = newUserData['github-user'];
    const response = await fetch(`https://api.github.com/search/users?q=${user}`);
    const json = await response.json();
    const data = json["items"][0]; 

    const dataUser = {
      id: data.id,
      avatar: data.avatar_url,
      url: data.url,
      repos_url: data.repos_url,
      html_url: data.html_url
    }

    return dataUser;
  };

  function saveLocalStorage(newUser) {
    const savedData = JSON.parse(localStorage.getItem('users')) || [];
    const dataWithNewUser = [...savedData, newUser];
    localStorage.setItem('users', JSON.stringify(dataWithNewUser));
    setRedirectToHomePage(true);
  }

  async function saveNewUser() {
    const gitHubData = await fetchGitHub();
    
    const newUser = {
      ...newUserData,
      fullAddress,
      gitHubData
    }

    saveLocalStorage(newUser);
  }

  function handleChange({ value, name }) {
    setNewUserData({
      ...newUserData,
      [name]: value
    });
  }

  function autoCompleteAddress(address) {
    setState(address.uf);
    setCity(address.localidade);
    setDistrict(address.bairro);
    setStreet(address.logradouro);
    setFullAddress(address);
  }

  async function fetchCEP(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    autoCompleteAddress(data);
  };

  function getDataCEP(cep) {
    if (cep.length === 8) {
      handleChange({ name: 'cep', value: cep  })
      fetchCEP(cep);
    }
    else { 
      setState('');
      setCity('');
      setDistrict('');
      setStreet('');
    }
  }
 
  return (
    <div>
      <label>Adicionar</label>
      
      <br /><br />
      <div>
        <label htmlFor="input-name">Nome</label>
        <input
          id="input-name"
          type="text"
          placeholder="Digite um nome"
          name="name"
          onChange={(e) => handleChange(e.target)}
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-age">Idade</label>
        <input
          type="number"
          id="input-age"
          name="age"
          min="0"
          max="150"
          onChange={(e) => handleChange(e.target)}
        />

        <label htmlFor="input-github-user">GitHub User</label>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          onChange={(e) => handleChange(e.target)}
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-cep">CEP</label>
        <input type="text" id="input-cep" onChange={ (e) => getDataCEP(e.target.value) } />

        <label htmlFor="input-estado">Estado</label>
        <input
          type="text"
          id="input-estado"
          value={ state }
          name="state"
          disabled={true}
        />

        <label htmlFor="input-cidade">Cidade</label>
        <input
          type="text"
          id="input-cidade"
          value={ city }
          name="city"
          disabled={true}
        />

        <label htmlFor="input-bairro">Bairro</label>
        <input
          type="text"
          id="input-bairro"
          value={ district }
          name="district"
          disabled={true}
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-rua">Rua</label>
        <input
          type="text"
          id="input-rua"
          value={ street }
          name="street"
          disabled={true}
        />

        <label htmlFor="input-rua-número">Número</label>
        <input
          type="text"
          id="input-rua-número"
          name="number"
          onChange={ (e) => handleChange(e.target)}
        />

        <label htmlFor="input-complemento">Complemento</label>
        <input
          type="text"
          id="input-complemento"
          name="complement"
          onChange={ (e) => handleChange(e.target) }
        />
      </div>

      <br />
      <button onClick={ () =>  setRedirectToHomePage(true) }>Cancelar</button>
      <button onClick={ () => saveNewUser() }>Salvar</button>
      { redirectToHomePage ?  <Navigate to="/" /> : null}
    </div>
  );
}

export default Cadastrar;
