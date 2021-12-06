import React from 'react'

function UpdateForm({ newName, setNewName, newAge, setNewAge, newGitHubUser, setNewGitHubUser, newCEP, setNewCEP,
  newState, newCity, newDistrict, newStreet, newNumber, setNewNumber, newComplement, setNewComplement, messageInvalidCep, messageInvalidGitHubUser,
  messageUserAlreadyRegistered}) {
  return (
    <div>
      <label>Editar</label>
      
      <br /><br />
      <div>
        <label htmlFor="input-name">Nome</label>
        <input
          id="input-name"
          type="text"
          placeholder="Digite um nome"
          name="name"
          value={ newName }
          data-testid="name-input"
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
          data-testid="age-input"
          onChange={ (e) => setNewAge(e.target.value) }
        />

        <label htmlFor="input-github-user">GitHub User</label>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          value={ newGitHubUser }
          data-testid="github-input"
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
          data-testid="cep-input"
        />

        <label htmlFor="input-estado">Estado</label>
        <input
          type="text"
          id="input-estado"
          name="state"
          value={ newState }
          data-testid="state-input"
          disabled={true}
        />

        <label htmlFor="input-cidade">Cidade</label>
        <input
          type="text"
          id="input-cidade"
          name="city"
          value={ newCity }
          data-testid="city-input"
          disabled={true}
        />

        <label htmlFor="input-bairro">Bairro</label>
        <input
          type="text"
          id="input-bairro"
          name="district"
          value={ newDistrict }
          data-testid="district-input"
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
          data-testid="street-input"
          disabled={true}
        />

        <label htmlFor="input-rua-número">Número</label>
        <input
          type="text"
          id="input-rua-número"
          name="number"
          value={ newNumber }
          data-testid="number-input"
          onChange={ (e) => setNewNumber(e.target.value)}
        />

        <label htmlFor="input-complemento">Complemento</label>
        <input
          type="text"
          id="input-complemento"
          name="complement"
          value={ newComplement }
          data-testid="complement-input"
          onChange={ (e) => setNewComplement(e.target.value) }
        />
      </div>
      
      <br />
      { messageInvalidCep && <p>CEP não encontrado</p> }
      { messageInvalidGitHubUser && <p>GitHub User não encontrado</p> }
      { messageUserAlreadyRegistered && <p>GitHub User já registrado</p> }
    </div>
  )
}

export default UpdateForm;
