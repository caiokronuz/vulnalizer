import React, {Component} from 'react';
import './styles.css';

import api from '../../services/api';
import {Link} from 'react-router-dom';

import Header from '../../Components/Header';

export default class FilteredPage extends Component{
    state = {
        results: [],
    }

    componentDidMount(){
        this.loadVulns();
    }
    

    loadVulns = async() => {
        try{
            const {id} = this.props.match.params;
            const token = localStorage.getItem('app-token')
            const response = await api.get(`api/assets/?vulnerability=${id}`, {headers: { Authorization: `Token ${token}`}})
            const {results} = await response.data;
            console.log(results);
            this.setState({results})
        }catch(err){
            console.log(err)
        }
        
    };


    render(){
        const {results} = this.state;
        return(
            <div id="filtered-page">
                
                <Header />
    
                <section className="content">
                    <div className="filter">
                        <a href="/" className="back">Voltar</a>
                    </div>
                    <ul className="hosts">
                        {results.map(host => (
                            <li key={host.id}>
                                <h1>{host.hostname}</h1>
                                <p>IP: <span>{host.ip_address}</span></p>
                                <p>Risco: <span>{host.risk}</span></p>
                                <p>Vulnerabilidades: <span>{host.vuln_count}</span></p>
                                <Link className='button' to={`/host/${host.id}`}>Detalhes</Link>
                            </li>  
                        ))}
                    </ul>
                </section>
            </div>
        );
     }
    
}