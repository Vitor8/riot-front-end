import React from 'react';

function RegisterForm({ name, age, gitHubUser, number, complement, messageInvalidCep, messageInvalidGitHubUser,
  messageUserAlreadyRegistered, setName, setAge, setGitHubUser, setNumber, setComplement, getDataCEP, state, city, district, street }) {

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
          value={ name }
          onChange={(e) => setName(e.target.value)}
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
          value={ age }
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="input-github-user">GitHub User</label>
        <input
          type="text"
          id="input-github-user"
          name="github-user"
          value={ gitHubUser }
          onChange={(e) => setGitHubUser(e.target.value)}
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
          value={ number }
          onChange={ (e) => setNumber(e.target.value)}
        />

        <label htmlFor="input-complemento">Complemento</label>
        <input
          type="text"
          id="input-complemento"
          name="complement"
          value={ complement }
          onChange={ (e) => setComplement(e.target.value) }
        />
      </div>

      <br />
      { messageInvalidCep && <p>CEP não encontrado</p> }
      { messageInvalidGitHubUser && <p>GitHub User não encontrado</p> }
      { messageUserAlreadyRegistered && <p>GitHub User já registrado</p> }
    </div>
  );
}

export default RegisterForm;
