import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { getCEP, getGitHub } from '../services/api';

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
    const data = await getGitHub(user);

    const dataUser = {
      id: data.id,
      avatar: data.avatar_url,
      url: data.url,
      repos_url: data.repos_url,
      html_url: data.html_url
    }

    return dataUser;
  };

  async function fetchCEP(cep) {
    const data = await getCEP(cep);
    autoCompleteAddress(data);
  };

  function handleChange({ value, name }) {
    setNewUserData({
      ...newUserData,
      [name]: value
    });
  }

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
 
  function autoCompleteAddress(address) {
    setState(address.uf);
    setCity(address.localidade);
    setDistrict(address.bairro);
    setStreet(address.logradouro);
    setFullAddress(address);
  }

  async function createUser(user) {
    const rawResponse = await fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });

    const content = await rawResponse.json();
  
    console.log(content);
  }

  async function saveNewUser() {
    const gitHubData = await fetchGitHub();
    
    const newUser = {
      ...newUserData,
      fullAddress,
      gitHubData
    }

    await createUser(newUser);

    setRedirectToHomePage(true);
  }

  return (
    <div>
      <RegisterForm
        handleChange={ handleChange }
        getDataCEP={ getDataCEP }
        state={ state }
        city={ city }
        district={ district }
        street={ street }
      />

      <button onClick={ () =>  setRedirectToHomePage(true) }>Cancelar</button>
      <button onClick={ () => saveNewUser() }>Salvar</button>
      { redirectToHomePage ?  <Navigate to="/" /> : null}
    </div>
  );
}

export default Cadastrar;
