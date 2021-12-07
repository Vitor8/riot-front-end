import React from 'react';
import '../css/Cadastrar.css';

function RegisterForm({ name, age, gitHubUser, number, complement, messageInvalidCep, messageInvalidGitHubUser,
  messageUserAlreadyRegistered, setName, setAge, setGitHubUser, setNumber, setComplement, getDataCEP, state, city, district, street }) {

  return (
    <div className="register-content">
      <label className="register-title">Adicionar</label>
    
      <br /><br />

      <div>
        <label htmlFor="input-name">Nome</label> <br />
        <input
          id="input-name"
          type="text"
          placeholder="Digite um nome"
          name="name"
          value={ name }
          data-testid="name-input"
          className="input-text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      
      <div>
        <label htmlFor="input-age">Idade</label> <br/>
        <input
          type="number"
          id="input-age"
          name="age"
          min="0"
          max="150"
          value={ age }
          data-testid="age-input"
          className="input-text"
          onChange={(e) => setAge(e.target.value)}
        /> <br/> 

        <label htmlFor="input-github-user">GitHub User</label> <br/>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          placeholder="Usuário do GitHub"
          value={ gitHubUser }
          data-testid="github-input"
          className="input-text"
          onChange={(e) => setGitHubUser(e.target.value)}
        />
      </div> 

      <div>
        <label htmlFor="input-cep">CEP</label> <br/>
        <input
          type="text"
          id="input-cep"
          onChange={ (e) => getDataCEP(e.target.value) }
          placeholder="Ex: 17031450"
          data-testid="cep-input"
          className="input-text"
        /> <br/> 

        <label htmlFor="input-estado">Estado</label> <br />
        <input
          type="text"
          id="input-estado"
          value={ state }
          name="state"
          data-testid="state-input"
          className="input-text"
          disabled={true}
        /> <br/> 

        <label htmlFor="input-cidade">Cidade</label> <br />
        <input
          type="text"
          id="input-cidade"
          value={ city }
          name="city"
          data-testid="city-input"
          className="input-text"
          disabled={true}
        /> <br />

        <label htmlFor="input-bairro">Bairro</label> <br />
        <input
          type="text"
          id="input-bairro"
          value={ district }
          name="district"
          data-testid="district-input"
          className="input-text"
          disabled={true}
        />
      </div>

      <div>
        <label htmlFor="input-rua">Rua</label> <br />
        <input
          type="text"
          id="input-rua"
          value={ street }
          name="street"
          data-testid="street-input"
          className="input-text"
          disabled={true}
        /> <br/>

        <label htmlFor="input-rua-número">Número</label> <br />
        <input
          type="text"
          id="input-rua-número"
          name="number"
          value={ number }
          placeholder="---"
          data-testid="number-input"
          className="input-text"
          onChange={ (e) => setNumber(e.target.value)}
        /> <br />

        <label htmlFor="input-complemento">Complemento</label> <br />
        <input
          type="text"
          id="input-complemento"
          name="complement"
          value={ complement }
          placeholder="Ex: Casa 01, Ap 20 / BL 01..."
          data-testid="complement-input"
          className="input-text"
          onChange={ (e) => setComplement(e.target.value) }
        />
      </div>

      <br />
      { messageInvalidCep && <p className="warning-text">CEP não encontrado</p> }
      { messageInvalidGitHubUser && <p className="warning-text">GitHub User não encontrado</p> }
      { messageUserAlreadyRegistered && <p className="warning-text">GitHub User já registrado</p> }
    </div>
  );
}

export default RegisterForm;
