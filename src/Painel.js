/* Importação de bibliotecas e componentes */
import React from 'react';
import Button from '@material-ui/core/Button';
import Header from './Header';
import Alert from './Alert';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Favoritos from './Favoritos';
import {ExitToApp, Bookmark, Contacts, PhoneIphone, Email, Person, Favorite, HighlightOff} from '@material-ui/icons';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Painel extends React.Component {

    // Constructor, sempre executado inicialmente quando a classe é carregada
    constructor(props){
        super(props)

        // O state é um dado guardado em memória que pode ser reaproveitado em tempo de execução.
        this.state = {
            user: '',
            value: 0,
            open: false,
            nome: '',
            email: '',
            celular: '',
            sexo: '',
            contatos: [],
            showAlert: false,
            showAlertPainel: false,
            titleAlert: '',
            messageAlert: '',
            typeAlert: ''
        }
    }

    // Este método é executado após o carregamento da classe. Assim que o componente é montado, normalmente é executado após o constructor 
    componentDidMount() {
        let user = localStorage.getItem('userLogado') !== undefined && localStorage.getItem('userLogado') !== null ? JSON.parse(localStorage.getItem('userLogado')) : null;
        user == null ? this.props.history.push('/') : this.setState({ user: user });

        let contacts = localStorage.getItem('contacts') !== undefined && localStorage.getItem('contacts') !== null ? JSON.parse(localStorage.getItem('contacts')) : [];
        console.log('CONTACTS', contacts);
        this.setState({ contatos: contacts });
    }


    // Método criado para abrir o modal caso esteja fechado
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    // Método criado para fechar o modal caso esteja aberto
    handleClose = () => {
        this.setState({ open: false });
    };

    // Método criado para ocultar mensagem de alerta após o tempo determinado
    hiddenNotificationPanel = () => {
        setTimeout(
            () => {this.setState({ showAlertPainel: false })},
            4000
        );
    }

    // Metodo criado para capturar o valor do campo sexo de acordo como é preenchido
    handleSexo = (e) => {
        this.setState({ sexo: e.target.value });
    }

    // Metodo criado para capturar o valor do campo nome de acordo como é preenchido
    handleNome = (e) => {
        this.setState({ nome: e.target.value });
    }

    // Metodo criado para capturar o valor do campo email de acordo como é preenchido
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    // Metodo criado para capturar o valor do campo celular de acordo como é preenchido
    handleCelular = (e) => {
        this.setState({ celular: e.target.value });
    }

    // Método criado para realizar o redirecionamento entre os links do menu
    handleRedirect(link) {
        if(link == '/'){
            localStorage.removeItem('userLogado');
        }

        this.props.history.push(link);
    }

    // Método criado para realizar a criação de um novo contato, onde captura os campos nome, email, sexo, celular e realiza a criação do contato no localStorage
    newContact = () => {
        const { nome, email, sexo, celular } = this.state;

        if(nome == ''){
            console.log('nome');
            this.setState({ showAlert: true, titleAlert: 'Campo Senha', typeAlert: 'warning', messageAlert: 'Preencha o campo nome!' });
        }
        else if(email == ''){
            this.setState({ showAlert: true, titleAlert: 'Campo Senha', typeAlert: 'warning', messageAlert: 'Preencha o campo email!' });
        }
        else if(sexo == ''){
            this.setState({ showAlert: true, titleAlert: 'Campo Senha', typeAlert: 'warning', messageAlert: 'Preencha o campo sexo!' });
        }
        else if(celular == ''){
            this.setState({ showAlert: true, titleAlert: 'Campo Senha', typeAlert: 'warning', messageAlert: 'Preencha o campo celular!' });
        }
        else{
            let contact = { 
                nome: nome,
                favorite: false,
                email: email,
                celular: celular,
                sexo: `https://randomuser.me/api/portraits/${sexo}/${parseInt(Math.random() * (100 - 1) + 1)}.jpg`
            }

            let contacts = localStorage.getItem('contacts') !== undefined && localStorage.getItem('contacts') !== null ? JSON.parse(localStorage.getItem('contacts')) : [];
            console.log('contacts', contacts);
            contacts.push(contact);

            localStorage.setItem('contacts', JSON.stringify(contacts));

            this.setState({ contatos: contacts, open: false });
        }
    }

    // Metodo criado para remover um contato
    removeContact = (contact) => {
        let refreshContact = this.state.contatos.filter(e => e.sexo != contact);

        localStorage.setItem('contacts', JSON.stringify(refreshContact));
        this.setState({ contatos: refreshContact, showAlertPainel: true, titleAlert: 'Sucesso!', typeAlert: 'success', messageAlert: 'Contato removido com sucesso!' });
        this.hiddenNotificationPanel();
    }

    // Metodo criado para favoritas um contato ou desfavorita-lo
    favoriteContact = (contact) => {
        let favoriteContactIndex = this.state.contatos.findIndex(e => e.sexo == contact);
        this.state.contatos[favoriteContactIndex].favorite == true ? this.state.contatos[favoriteContactIndex].favorite = false : this.state.contatos[favoriteContactIndex].favorite = true;

        localStorage.setItem('contacts', JSON.stringify(this.state.contatos));
        this.setState({ contatos: this.state.contatos, showAlertPainel: true, titleAlert: 'Sucesso!', typeAlert: 'success', messageAlert: 'Contato favoritado com sucesso!' });
        this.hiddenNotificationPanel();
        
        console.log(this.state.contatos);
    }

    render(){
        const sexo = [
            {
                value: 'men',
                label: 'Masculino'
            },
            {
                value: 'women',
                label: 'Feminino'
            }
        ];

        return (
            <div className="main">
                <Header />

                <div className="menuPainel">
                    <ul>
                        <li onClick={() => this.handleRedirect('/painel')}><span className="iconMenu"><Contacts /></span> Contatos</li>
                        <li onClick={() => this.handleRedirect('/favoritos')}><span className="iconMenu"><Bookmark /></span> Favoritos</li>
                        <li onClick={() => this.handleRedirect('/')}><span className="iconMenu"><ExitToApp /></span> Logout</li>
                    </ul>
                </div>
                
                <div className="login">
                    <Button variant="contained" className="btnLogin" onClick={this.handleClickOpen}>Novo Contato</Button><br/><br/><br/>

                    <Alert title={this.state.titleAlert} message={this.state.messageAlert} type={this.state.typeAlert} showAlert={this.state.showAlertPainel} />

                    { 
                        // Trecho de código que lista os contatos
                        this.state.contatos.length > 0 
                        ? this.state.contatos.map(
                            e => <Card className="contact">
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        <img src={e.sexo} className="imgContato" /> <br/>
                                        <p><span className="iconMenu"><Person /> {e.nome} </span></p>
                                        <p><span className="iconMenu"><Email /> {e.email}</span></p>
                                        <p><span className="iconMenu"><PhoneIphone /> {e.celular} </span></p>
                                    </Typography>
                                </CardContent>
                                <CardActions className="buttonFooter">
                                    <Button size="small" className={e.favorite == true ? 'favoriteOn' : ''} onClick={() => this.favoriteContact(e.sexo)}><Favorite /></Button>
                                    <Button size="small" onClick={() => this.removeContact(e.sexo)}><HighlightOff /></Button>
                                </CardActions>
                            </Card>
                        )
                        : ''
                    }
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Novo Contato</DialogTitle>
                    <DialogContent>
                    <Alert title={this.state.titleAlert} message={this.state.messageAlert} type={this.state.typeAlert} showAlert={this.state.showAlert} />

                    <DialogContentText id="alert-dialog-description">
                        <TextField id="nome" className="inputContact" onChange={this.handleNome}  label="Nome" />
                        <TextField id="email" className="inputContact" onChange={this.handleEmail} label="Email" />
                        <TextField id="celular" className="inputContact" onChange={this.handleCelular} label="Celular" />

                        <TextField id="standard-select-currency" className="inputContact" select label="Sexo" value={this.state.sexo} onChange={this.handleSexo}>
                        {sexo.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Fechar</Button>
                    <Button onClick={this.newContact} color="primary" autoFocus>Salvar</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default Painel;