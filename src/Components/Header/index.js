import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css'

function Header(){
    function loggout(){
        localStorage.removeItem('app-token');
    }

    return(
        <header className="cabecalho-pag"> 
            <h1>Vulnalizer</h1>
            <div id="links">
                <Link to="/dashboard"><span>Dashboard</span></Link>
                <Link to="/"><span>Lista</span></Link>
                <Link to="/login" onClick={loggout}><span>Deslogar</span></Link>
            </div>
        </header>
    );
}

export default Header;