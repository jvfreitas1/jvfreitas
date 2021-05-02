/* Importação de bibliotecas e componentes */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from './Header';
import Alert from './Alert';
import './App.css';

class App extends React.Component {

  // Constructor, sempre executado inicialmente quando a classe é carregada
  constructor(props){
    super(props)

    // O state é um dado guardado em memória que pode ser reaproveitado em tempo de execução.
    this.state = {
      email: '',
      senha: '',
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
      typeAlert: '',
      redirection: false
    }
  }

  // Metodo criado para capturar o valor do campo email de acordo como é preenchido
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  // Metodo criado para capturar o valor do campo senha de acordo como é preenchido
  handleSenha = (e) => {
      this.setState({ senha: e.target.value });
  }

  // Método criado para realizar o login do usuário, verifica os campos login e senha no local storage para verificar se os campos coincidem e realiza o login, criando uma nova variável no local storage que é uma sessão que persiste durante o login
  handleLogin = () => {
    let users = localStorage.getItem('users') !== undefined && localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : null;

    if(users != undefined && users != null){
      let findIndex = users.find(e => e.email === this.state.email && e.senha === this.state.senha);

      if(findIndex == undefined){
        this.setState({ showAlert: true, titleAlert: 'Usuário Inexistente', typeAlert: 'error', messageAlert: 'Não foi possível encontrar usuário com os dados fornecidos!' });
      }
      else{
        this.setState({ redirection: true, user: findIndex });
        console.log('USUARIO', findIndex);
      }
    }
    else{
      this.setState({ showAlert: true, titleAlert: 'Usuário Inexistente', typeAlert: 'error', messageAlert: 'Não foi possível encontrar usuário com os dados fornecidos!' });
    }
  }

  render(){
      if(this.state.redirection == true){
        localStorage.setItem('userLogado', JSON.stringify(this.state.user));
        this.props.history.push('/painel/');
      }

    return (
      <div className="main">
        <Header />

        <Alert title={this.state.titleAlert} message={this.state.messageAlert} type={this.state.typeAlert} showAlert={this.state.showAlert} />

        <div className="login">
          <h3>Entrar</h3>

          <TextField id="email" className="inputLogin" onChange={this.handleEmail} label="Email" />
          <TextField id="senha" className="inputLogin" onChange={this.handleSenha} type="password" label="Senha" />

          <Button variant="contained" className="btnLogin" onClick={this.handleLogin}>Login</Button>
          <br/>

          <div className="linkCadastro">
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default App;