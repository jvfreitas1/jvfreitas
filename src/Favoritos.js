/* Importação de bibliotecas e componentes */
import React from 'react';
import Header from './Header';
import {ExitToApp, Bookmark, Contacts, PhoneIphone, Email, Person, Favorite, HighlightOff} from '@material-ui/icons'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// chamada de classe principal React
class Favoritos extends React.Component {

    // Constructor, sempre executado inicialmente quando a classe é carregada
    constructor(props){
        super(props);

        // O state é um dado guardado em memória que pode ser reaproveitado em tempo de execução.
        this.state = {
            contatos: []
        }
    }

    // Este método é executado após o carregamento da classe. Assim que o componente é montado, normalmente é executado após o constructor 
    componentDidMount() {
        let user = localStorage.getItem('userLogado') !== undefined && localStorage.getItem('userLogado') !== null ? JSON.parse(localStorage.getItem('userLogado')) : null;
        user == null ? this.props.history.push('/') : this.setState({ user: user });

        let contacts = localStorage.getItem('contacts') !== undefined && localStorage.getItem('contacts') !== null ? JSON.parse(localStorage.getItem('contacts')) : [];
        if(contacts.length > 0){
            contacts = contacts.filter(e => e.favorite == true);
        }

        this.setState({ contatos: contacts });
    }

    // Método criado para realizar o redirecionamento entre os links do menu
    handleRedirect(link) {
        if(link == '/'){
            localStorage.removeItem('userLogado');
        }

        this.props.history.push(link);
    }

    render(){
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
                    <Button></Button>
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
                            </Card>
                        )
                        : ''
                    }
                </div>
            </div>
        )
    }

}


export default Favoritos;