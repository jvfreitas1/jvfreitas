/* Importação de bibliotecas e componentes */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from './Header';
import Alert from './Alert';
import './App.css';

class Cadastro extends React.Component {
    // Constructor, sempre executado inicialmente quando a classe é carregada
    constructor(props){
        super(props)

        // O state é um dado guardado em memória que pode ser reaproveitado em tempo de execução.
        this.state = {
            nome: '',
            email: '',
            senha: '',
            showAlert: false,
            titleAlert: '',
            messageAlert: '',
            typeAlert: ''
        }
    }

    // Metodo criado para capturar o valor do campo nome de acordo como é preenchido
    handleNome = (e) => {
        this.setState({ nome: e.target.value });
    }

    // Metodo criado para capturar o valor do campo email de acordo como é preenchido
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    // Metodo criado para capturar o valor do campo senha de acordo como é preenchido
    handleSenha = (e) => {
        this.setState({ senha: e.target.value });
    }

    // Método criado para pegar os valores preenchidos nos campos nome, email e senha e realiza a verificação para ver se existe email cadastrado, se não existe, é criado um novo usuário e persistido a informação no local storage
    handleCadastro = () => {
        console.log('USERS', JSON.parse(localStorage.getItem('users')));

        if(this.state.nome === "" && this.state.nome.length < 3){
            this.setState({ showAlert: true, titleAlert: 'Campo Nome', typeAlert: 'warning', messageAlert: 'Preencha o campo nome com ao menos 3 caracteres!' });
        }
        else if(this.state.email === ''){
            this.setState({ showAlert: true, titleAlert: 'Campo Email', typeAlert: 'warning', messageAlert: 'Preencha o campo email!' });
        }
        else if(this.state.email.indexOf('@') === -1 || this.state.email.indexOf('') === -1){
            this.setState({ showAlert: true, titleAlert: 'Campo Email', typeAlert: 'warning', messageAlert: 'Necessário estar no formato de email!' });
        }
        else if(this.state.senha === '' && this.state.senha.length < 3){
            this.setState({ showAlert: true, titleAlert: 'Campo Senha', typeAlert: 'warning', messageAlert: 'Preencha o campo senha com ao menos 3 caracteres!' });
        }
        else{
            this.setState({ showAlert: false });
            let users = localStorage.getItem('users') != undefined && localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : null;
            let usersStorage = [];
            if(users !== null && users != undefined){
                let findIndex = users.find(e => e.email === this.state.email);

                if(findIndex !== undefined){
                    this.setState({ showAlert: true, titleAlert: 'Usuário Existente', typeAlert: 'error', messageAlert: 'Não foi possível criar seu usuário, porque já existe o e-mail cadastrado!' });
                }
                else{
                    users.push({ nome: this.state.nome, email: this.state.email, senha: this.state.senha });
                    localStorage.setItem('users', JSON.stringify(users));

                    this.setState({ showAlert: true, titleAlert: 'Usuário Cadastrado', typeAlert: 'success', messageAlert: 'Usuário Cadastrado com sucesso!' });
                }
            }
            else{
                usersStorage.push({ nome: this.state.nome, email: this.state.email, senha: this.state.senha });
                localStorage.setItem('users', JSON.stringify(usersStorage));
                this.setState({ showAlert: true, titleAlert: 'Usuário Cadastrado', typeAlert: 'success', messageAlert: 'Usuário Cadastrado com sucesso!' });
            }
        }
    }

    render(){
        return (
            <div className="main">
            <Header />

            <Alert title={this.state.titleAlert} message={this.state.messageAlert} type={this.state.typeAlert} showAlert={this.state.showAlert} />

            <div className="login">
                <h3>Cadastro</h3>

                <TextField id="nome" className="inputLogin" onChange={this.handleNome} label="Nome" />
                <TextField id="email" className="inputLogin" onChange={this.handleEmail} label="Email" />
                <TextField id="senha" className="inputLogin" onChange={this.handleSenha} type="password" label="Senha" />

                <Button variant="contained" className="btnLogin" onClick={this.handleCadastro}>Cadastro</Button>
                <br/>
                <div className="linkCadastro">
                    <Link to="/">Voltar</Link>
                </div>
            </div>
            </div>
        );
    }
}

export default Cadastro;
