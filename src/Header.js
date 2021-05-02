/* Importação de bibliotecas e componentes */
import ContactMail from '@material-ui/icons/ContactMail';
import './App.css';

// Componente modular que gera o cabeçalho do site, com logo e espaçamento
function Header() {
    return (
        <div className="header">
            <ContactMail style={{ fontSize: 70 }} />
            <br />Contatos
        </div>
    )
}

export default Header;