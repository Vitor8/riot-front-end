import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

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
    const len = savedData.length;
    const newUserWithId = {
      id: len + 1,
      ...newUser
    }
    const dataWithNewUser = [...savedData, newUserWithId];
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
