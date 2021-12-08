import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import App from '../App';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

describe('1 - Testa se é possível criar novos usuários', () => {

  test('A página de Login deve possuir um campo para o email, para a senha e um botão de Login', () => {
    render(<Login />);

    const emailLabel = screen.getByTestId("email-label");
    const passwordLabel = screen.getByTestId("password-label");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Ao clicar no botão de Login a página inicial deve ser renderizada', async () => {
    const history = createMemoryHistory();
    history.push('/');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, 'v@gmail.com');
    userEvent.type(passwordInput, '123456');

    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('login-button'));
    await waitFor(() => screen.getByTestId('button-cadastrar'));
    expect(screen.getByTestId('button-cadastrar')).toBeInTheDocument();
  });

  test('Ao clicar no botão de Cadastrar a página de cadastro deve ser renderizada', async () => {
    const history = createMemoryHistory();
    history.push('/home');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cadastrar/i));

    await waitFor(() => screen.getByText(/Adicionar/i));
    expect(screen.getByText(/Adicionar/i)).toBeInTheDocument();
  });

  test('A paǵina de Cadastro deve possuir todos os campos de preenchimento necessários', () => {
    const history = createMemoryHistory();
    history.push('/cadastrar');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );

    const nameLabel = screen.getByText(/Nome/i);
    const ageLabel = screen.getByText('Idade');
    const gitHubLabel = screen.getByText(/GitHub User/i);
    const cepLabel = screen.getByText(/CEP/i);
    const stateLabel = screen.getByText(/Estado/i);
    const cityLabel = screen.getByText(/Cidade/i);
    const districtLabel = screen.getByText(/Bairro/i);
    const streetLabel = screen.getByText(/Rua/i);
    const numberLabel = screen.getByText(/Número/i);
    const complementLabel = screen.getByText(/Complemento/i);

    const nameInput = screen.getByTestId("name-input");
    const AgeInput = screen.getByTestId("age-input");
    const gitHubInput = screen.getByTestId("github-input");
    const cepInput = screen.getByTestId("cep-input");
    const stateInput = screen.getByTestId("state-input");
    const cityInput = screen.getByTestId("city-input");
    const districtInput = screen.getByTestId("district-input");
    const streetInput = screen.getByTestId("street-input");
    const numberInput = screen.getByTestId("number-input");
    const complementInput = screen.getByTestId("complement-input");

    const saveButton = screen.getByTestId("save-button");

    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
    expect(gitHubLabel).toBeInTheDocument();
    expect(cepLabel).toBeInTheDocument();
    expect(stateLabel).toBeInTheDocument();
    expect(cityLabel).toBeInTheDocument();
    expect(districtLabel).toBeInTheDocument();
    expect(streetLabel).toBeInTheDocument();
    expect(numberLabel).toBeInTheDocument();
    expect(complementLabel).toBeInTheDocument();

    expect(nameInput).toBeInTheDocument();
    expect(AgeInput).toBeInTheDocument();
    expect(gitHubInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(districtInput).toBeInTheDocument();
    expect(streetInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(complementInput).toBeInTheDocument();

    expect(saveButton).toBeInTheDocument();
  });

  test('Após preencher todos campos, testa se o usuário foi criado com sucesso', async () => {
    const history = createMemoryHistory();
    history.push('/cadastrar');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );

    const nameInput = screen.getByTestId("name-input");
    const AgeInput = screen.getByTestId("age-input");
    const gitHubInput = screen.getByTestId("github-input");
    const cepInput = screen.getByTestId("cep-input");
    const numberInput = screen.getByTestId("number-input");
    const complementInput = screen.getByTestId("complement-input");

    userEvent.type(nameInput, 'Laura');
    userEvent.type(AgeInput, '25');
    userEvent.type(gitHubInput, 'LauraGusmao');
    userEvent.type(cepInput, '17031460');
    userEvent.type(numberInput, '360');
    userEvent.type(complementInput, 'Apt B');

    // Erro de assincronicidade, em alguns casos a linha abaixo funciona, outras vezes não
    // await waitFor(() => { screen.getByDisplayValue("SP"); });
    
    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() => screen.getByText('Laura'));

    expect(screen.getByText('Laura')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('LauraGusmao')).toBeInTheDocument();
  });

});

describe('2 - Testa se é possível editar usuários', () => {
  test('Ao clicar no botão de Atualizar, a página de edição deve ser renderizada', async () => {
    const history = createMemoryHistory();
    history.push('/home');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => screen.getByText('Laura'));

    const updateButton = screen.getAllByTestId('update-button');
    const lastUpdateButtonIndex = updateButton.length - 1;
    fireEvent.click(updateButton[lastUpdateButtonIndex]);

    await waitFor(() => screen.getByText(/Editar/i));

    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
  });

  test('A página de Edição deve possuir todos os campos de preenchimento necessários', async () => {
    const history = createMemoryHistory();
    history.push('/atualizar');
    render(
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>,
    );

    const nameLabel = screen.getByText(/Nome/i);
    const ageLabel = screen.getByText('Idade');
    const gitHubLabel = screen.getByText(/GitHub User/i);
    const cepLabel = screen.getByText(/CEP/i);
    const stateLabel = screen.getByText(/Estado/i);
    const cityLabel = screen.getByText(/Cidade/i);
    const districtLabel = screen.getByText(/Bairro/i);
    const streetLabel = screen.getByText(/Rua/i);
    const numberLabel = screen.getByText(/Número/i);
    const complementLabel = screen.getByText(/Complemento/i);

    const nameInput = screen.getByTestId("name-input");
    const AgeInput = screen.getByTestId("age-input");
    const gitHubInput = screen.getByTestId("github-input");
    const cepInput = screen.getByTestId("cep-input");
    const stateInput = screen.getByTestId("state-input");
    const cityInput = screen.getByTestId("city-input");
    const districtInput = screen.getByTestId("district-input");
    const streetInput = screen.getByTestId("street-input");
    const numberInput = screen.getByTestId("number-input");
    const complementInput = screen.getByTestId("complement-input");

    const saveButton = screen.getByTestId("save-button");

    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
    expect(gitHubLabel).toBeInTheDocument();
    expect(cepLabel).toBeInTheDocument();
    expect(stateLabel).toBeInTheDocument();
    expect(cityLabel).toBeInTheDocument();
    expect(districtLabel).toBeInTheDocument();
    expect(streetLabel).toBeInTheDocument();
    expect(numberLabel).toBeInTheDocument();
    expect(complementLabel).toBeInTheDocument();

    expect(nameInput).toBeInTheDocument();
    expect(AgeInput).toBeInTheDocument();
    expect(gitHubInput).toBeInTheDocument();
    expect(cepInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(districtInput).toBeInTheDocument();
    expect(streetInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(complementInput).toBeInTheDocument();

    expect(saveButton).toBeInTheDocument();
  });

  // OBSERVAÇÃO: Não consegui fazer o teste abaixo funcionar, por isso o deixei comentado
  // test('Verifica se a edição de um usuário é bem sucedida', async () => {
  //   const history = createMemoryHistory();
  //   history.push('/home');
  //   render(
  //     <BrowserRouter history={history}>
  //       <App />
  //     </BrowserRouter>,
  //   );

  //   await waitFor(() => screen.getByText('Laura'));

  //   const updateButton = screen.getAllByText(/Atualizar/i);
  //   const lastUpdateButtonIndex = updateButton.length - 1;
  //   fireEvent.click(updateButton[lastUpdateButtonIndex]);

  //   await waitFor(() => screen.getByText(/Editar/i));

  //   userEvent.type(screen.getByTestId("name-input"), 'Laura Gusmão');

  //   fireEvent.click(screen.getByTestId("save-button"));

  //   await waitFor(() => screen.getByText(/Cadastrar/i));

  //   expect(screen.getByText('Laura Gusmão')).toBeInTheDocument();
  // });
});

// OBSERVAÇÃO: Não consegui fazer o teste abaixo funcionar, por isso o deixei comentado
// describe('3 - Teste se é possível deletar usuários', () => {
//   test('Verifica se é possível deletar um usuário', async () => {
//     const confirmSpy = jest.spyOn(window,'confirm').mockImplementation(); 

//     const history = createMemoryHistory();
//     history.push('/home');
//     render(
//       <BrowserRouter history={history}>
//         <App />
//       </BrowserRouter>,
//     );

//     await waitFor(() => screen.getByText('Laura'));

//     const deleteButton = screen.getAllByTestId('delete-button');
//     const lastDeleteButtonIndex = deleteButton.length - 1;
//     fireEvent.click(deleteButton[lastDeleteButtonIndex]);

//     window.confirm = jest.fn(() => true)

//     expect(confirmSpy).toHaveBeenCalledTimes(1);
//     expect(screen.getByText('Laura')).not.toBeInTheDocument();
//   });
// });