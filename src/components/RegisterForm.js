import React from 'react';

function RegisterForm({ handleChange, getDataCEP, state, city, district, street }) {

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
    </div>
  );
}

export default RegisterForm;
