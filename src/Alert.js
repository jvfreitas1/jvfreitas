/* Importação de bibliotecas e componentes */
import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

class Alerta extends React.Component {

    // Constructor, sempre executado inicialmente quando a classe é carregada
    constructor(props){
        super(props);
    }

    // Componente modular para criar alerta de notificação em base de parâmetros passados pelo arquivo que necessita chama-lo
    render(){
        return (
        <div>
            {
                this.props.showAlert === true ? 
                <Alert severity={this.props.type}>
                    <AlertTitle>{this.props.title}</AlertTitle>
                    {this.props.message}
                </Alert> 
                : ''
            }
        </div>
        );
    }
  }
  
  export default Alerta;