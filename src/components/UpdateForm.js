import React from 'react';
import '../css/Cadastrar.css';

function UpdateForm({ newName, setNewName, newAge, setNewAge, newGitHubUser, setNewGitHubUser, newCEP, setNewCEP,
  newState, newCity, newDistrict, newStreet, newNumber, setNewNumber, newComplement, setNewComplement, messageInvalidCep, messageInvalidGitHubUser }) {
  return (
    <div className="register-content">
      <label className="register-title">Editar</label>
      
      <br /><br />

      <div>
        <label htmlFor="input-name">Nome</label>  <br />
        <input
          id="input-name"
          type="text"
          placeholder="Digite um nome"
          name="name"
          value={ newName }
          data-testid="name-input"
          className="input-text"
          onChange={ (e) => setNewName(e.target.value)  }
        />
      </div>

      <div>
        <label htmlFor="input-age">Idade</label>
        <input
          type="number"
          id="input-age"
          name="age"
          min="0"
          max="150"
          value={ newAge }
          data-testid="age-input"
          className="input-text"
          onChange={ (e) => setNewAge(e.target.value) }
        />

        <label htmlFor="input-github-user">GitHub User</label> <br/>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          value={ newGitHubUser }
          data-testid="github-input"
          className="input-text"
          onChange={ (e) =>  setNewGitHubUser(e.target.value) }
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-cep">CEP</label> <br/>
        <input
          type="text"
          id="input-cep"
          value={ newCEP }
          onChange={ (e) => setNewCEP(e.target.value) }
          data-testid="cep-input"
          className="input-text"
        />

        <label htmlFor="input-estado">Estado</label> <br />
        <input
          type="text"
          id="input-estado"
          name="state"
          value={ newState }
          data-testid="state-input"
          className="input-text"
          disabled={true}
        />

        <label htmlFor="input-cidade">Cidade</label> <br />
        <input
          type="text"
          id="input-cidade"
          name="city"
          value={ newCity }
          data-testid="city-input"
          className="input-text"
          disabled={true}
        />

        <label htmlFor="input-bairro">Bairro</label> <br />
        <input
          type="text"
          id="input-bairro"
          name="district"
          value={ newDistrict }
          data-testid="district-input"
          className="input-text"
          disabled={true}
        />
      </div>

      <br />
      <div>
        <label htmlFor="input-rua">Rua</label> <br />
        <input
          type="text"
          id="input-rua"
          name="street"
          value={ newStreet }
          data-testid="street-input"
          className="input-text"
          disabled={true}
        />

        <label htmlFor="input-rua-número">Número</label> <br />
        <input
          type="text"
          id="input-rua-número"
          name="number"
          value={ newNumber }
          data-testid="number-input"
          className="input-text"
          onChange={ (e) => setNewNumber(e.target.value)}
        />

        <label htmlFor="input-complemento">Complemento</label> <br />
        <input
          type="text"
          id="input-complemento"
          name="complement"
          value={ newComplement }
          data-testid="complement-input"
          className="input-text"
          onChange={ (e) => setNewComplement(e.target.value) }
        />
      </div>
      
      <br />
      { messageInvalidCep && <p className="warning-text">CEP não encontrado</p> }
      { messageInvalidGitHubUser && <p className="warning-text">GitHub User não encontrado</p> }
    </div>
  )
}

export default UpdateForm;
