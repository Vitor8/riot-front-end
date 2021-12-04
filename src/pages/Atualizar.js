import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCEP, getGitHub } from '../services/api';

function Atualizar() {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  const [userId, setUserId] = useState('');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGitHubUser, setNewGitHubUser] = useState('');
  const [newCEP, setNewCEP] = useState('');
  const [newState, setNewState] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newComplement, setNewComplement] = useState('');
  const [fullAddress, setFullAddress] = useState({});
  
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userIdToUpdate'));
    const savedData = JSON.parse(localStorage.getItem('users'));
    const userToUpdate = savedData.filter((user) => user.id === userId)[0];
    setUserId(userId);
    setupCurrentValues(userToUpdate);
  },[]);

  useEffect(() => {
    if (newCEP.length === 8) {
      fetchCEP(newCEP);
    }
  },[newCEP]);

  async function fetchCEP(cep) {
    const data = await getCEP(cep);
    autoCompleteAddress(data);
  };

  function autoCompleteAddress(address) {
    setNewState(address.uf);
    setNewCity(address.localidade);
    setNewDistrict(address.bairro);
    setNewStreet(address.logradouro);
    setNewStreet(address.logradouro);
    setFullAddress(address);
  }

  function setupCurrentValues(userToUpdate) {
    console.log(userToUpdate);
    setNewName(userToUpdate['name']);
    setNewAge(userToUpdate['age']);
    setNewGitHubUser(userToUpdate['github-user']);
    setNewCEP(userToUpdate['cep']);
    setNewNumber(userToUpdate['number']);
    const complement = userToUpdate['complement'];
    if (complement !== undefined) setNewComplement(userToUpdate['complement']);
  }

  async function fetchGitHub() {
    const data = await getGitHub(newGitHubUser);

    const dataUser = {
      id: data.id,
      avatar: data.avatar_url,
      url: data.url,
      repos_url: data.repos_url,
      html_url: data.html_url
    }

    return dataUser;
  };

  async function updateUser() {
    const gitHubData = await fetchGitHub();
    
    const updatedUser = {
      age: newAge,
      cep: newCEP,
      'github-user': newGitHubUser,
      id: userId,
      name: newName,
      number: newNumber,
      complement: newComplement,
      fullAddress,
      gitHubData
    }

    const savedData = JSON.parse(localStorage.getItem('users'));
    const index = savedData.findIndex((user) => user.id === userId);
    const newData = [...savedData];
    newData[index] = updatedUser;

    localStorage.setItem('users', JSON.stringify(newData));

    setRedirectToHomePage(true);
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
          value={ newName }
          onChange={ (e) => setNewName(e.target.value)  }
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
          value={ newAge }
          onChange={ (e) => setNewAge(e.target.value) }
        />

        <label htmlFor="input-github-user">GitHub User</label>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          value={ newGitHubUser }
          onChange={ (e) =>  setNewGitHubUser(e.target.value) }
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-cep">CEP</label>
        <input
          type="text"
          id="input-cep"
          value={ newCEP }
          onChange={ (e) => setNewCEP(e.target.value) }
        />

        <label htmlFor="input-estado">Estado</label>
        <input
          type="text"
          id="input-estado"
          name="state"
          value={ newState }
          disabled={true}
        />

        <label htmlFor="input-cidade">Cidade</label>
        <input
          type="text"
          id="input-cidade"
          name="city"
          value={ newCity }
          disabled={true}
        />

        <label htmlFor="input-bairro">Bairro</label>
        <input
          type="text"
          id="input-bairro"
          name="district"
          value={ newDistrict }
          disabled={true}
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-rua">Rua</label>
        <input
          type="text"
          id="input-rua"
          name="street"
          value={ newStreet }
          disabled={true}
        />

        <label htmlFor="input-rua-número">Número</label>
        <input
          type="text"
          id="input-rua-número"
          name="number"
          value={ newNumber }
          onChange={ (e) => setNewNumber(e.target.value)}
        />

        <label htmlFor="input-complemento">Complemento</label>
        <input
          type="text"
          id="input-complemento"
          name="complement"
          value={ newComplement }
          onChange={ (e) => setNewComplement(e.target.value) }
        />
      </div>

      <br />

      <button onClick={ () =>  setRedirectToHomePage(true) }>Cancelar</button>
      <button onClick={ () => updateUser() }>Salvar</button>
      { redirectToHomePage ?  <Navigate to="/" /> : null}
    </div>
  );
}

export default Atualizar;
