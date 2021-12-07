import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { getCEP, getGitHub } from '../services/api';
import Header from '../components/Header';

import '../css/Cadastrar.css';

function Cadastrar() {
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gitHubUser, setGitHubUser] = useState('');
  const [cep, setCEP] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState(''); 
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [fullAddress, setFullAddress] = useState({});
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [messageInvalidCep, setMessageInvalidCep] = useState(false);
  const [messageInvalidGitHubUser, setMessageInvalidGitHubUser] = useState(false);
  const [messageUserAlreadyRegistered, setMessageUserAlreadyRegistered] = useState(false);

  useEffect(() => {
    if (shouldEnableSaveButton()) { 
      setDisableSaveButton(false);
    } else {
      setDisableSaveButton(true);
    }
  },[name, age, gitHubUser, cep, number, messageInvalidCep, messageInvalidGitHubUser]);

  function shouldEnableSaveButton() {
    if (name !=='' && age !== '' && gitHubUser !== '' && cep !== '' && number !== '' && !messageInvalidCep) return true;
    return false;
  }

  async function fetchGitHub() {
    const user = gitHubUser;
    const data = await getGitHub(user);

    if (!data) return false;

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
    if (!data || data.erro) return setMessageInvalidCep(true);
    setMessageInvalidCep(false);
    autoCompleteAddress(data);
  };

  function getDataCEP(cep) {
    if (cep.length === 8) {
      setCEP(cep);
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
    const token = JSON.parse(localStorage.getItem('token'));

    const rawResponse = await fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Authorization': token,
      },
      body: JSON.stringify({ user })
    });

    const content = await rawResponse.json();

    if (content.message === 'User already registered') return false;

    return true;
  }

  async function saveNewUser() {
    const gitHubData = await fetchGitHub();

    if (!gitHubData) {
      setMessageUserAlreadyRegistered(false);
      return setMessageInvalidGitHubUser(true);
    }

    const newUser = {
      name,
      age,
      gitHubUser,
      cep,
      number,
      complement,
      fullAddress,
      gitHubData
    }

    const userRegistered = await createUser(newUser);

    if (!userRegistered) { 
      setMessageInvalidGitHubUser(false);
      return setMessageUserAlreadyRegistered(true);
    }

    setRedirectToHomePage(true);
  }

  return (
    <div className="register-page">
      <Header />
      <RegisterForm
        name={ name }
        age={ age }
        gitHubUser={ gitHubUser }
        number={ number }
        complement={ complement }
        state={ state }
        city={ city }
        district={ district }
        street={ street }
        setName={ setName }
        setAge={ setAge }
        setGitHubUser={ setGitHubUser }
        setNumber={ setNumber }
        setComplement={ setComplement }
        getDataCEP={ getDataCEP }
        messageInvalidCep={ messageInvalidCep }
        messageInvalidGitHubUser={ messageInvalidGitHubUser }
        messageUserAlreadyRegistered={ messageUserAlreadyRegistered }
      />

    <div className="buttons-container">
      <button
        onClick={ () =>  setRedirectToHomePage(true) }
        className="button-cancel"
      >
        Cancelar
      </button>

      <button
        disabled={ disableSaveButton }
        onClick={ () => saveNewUser() }
        data-testid="save-button"
        className="button-save"
      >
        Salvar
      </button>
    </div>
    

      { redirectToHomePage ?  <Navigate to="/home" /> : null}
    </div>
  );
}

export default Cadastrar;
