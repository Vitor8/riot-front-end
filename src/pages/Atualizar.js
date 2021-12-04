import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCEP, getGitHub } from '../services/api';
import UpdateForm from '../components/UpdateForm';

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
      <UpdateForm
        newName={ newName }
        setNewName={ setNewName }
        newAge={ newAge }
        setNewAge={ setNewAge }
        newGitHubUser={ newGitHubUser }
        setNewGitHubUser={ setNewGitHubUser }
        newCEP={ newCEP }
        setNewCEP={ setNewCEP }
        newState={ newState }
        newCity={ newCity }
        newDistrict={ newDistrict }
        newStreet={ newStreet }
        newNumber={ newNumber }
        setNewNumber={ setNewNumber }
        newComplement={ newComplement }
        setNewComplement={ setNewComplement }
      />

      <br />

      <button onClick={ () =>  setRedirectToHomePage(true) }>Cancelar</button>
      <button onClick={ () => updateUser() }>Salvar</button>
      { redirectToHomePage ?  <Navigate to="/" /> : null}
    </div>
  );
}

export default Atualizar;
