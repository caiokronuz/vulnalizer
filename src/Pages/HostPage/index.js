import React, { Component } from 'react';
import './styles.css';

import api from '../../services/api';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header'
import count from '../../services/store/index';

export default class HostPage extends Component{
    state = {
        host: {},
        vuln: [],
        vuln_fixed: [],
        vulnerabilities: [],
        total: []
    }

    async componentDidMount(){
        try{
            count();
            const token = localStorage.getItem('app-token');
            const counter = localStorage.getItem('counter');
            const {id} = this.props.match.params;
            const response = await api.get(`api/assets/${id}`, {headers: { Authorization: `Token ${token}`}})
            const vulnz = await api.get(`api/vulnerabilities/?asset=${id}`, {headers: { Authorization: `Token ${token}`}})
            const tvulns = await api.get(`api/vulnerabilities/?page_size=${counter}`, {headers: { Authorization: `Token ${token}`}})
            const {results} = vulnz.data;
            const {data} = response;
            const {vuln_fixed} = response.data;
            const total = tvulns.data.results;
            this.setState({host: data,vuln_fixed, vulnerabilities: results, total});
        }catch(err){
            console.log(err);
        }
    }

    render(){
        const {host, vuln_fixed, vulnerabilities, total} = this.state;
        return(
            <div id="host-page">
                <Header />
                <Link to="/" id="button">Voltar</Link>
                <section className="host-details">
                    <h1>{host.hostname}</h1>
                    <h2>{host.ip_address}</h2>
                    <p>Risco: <span>{host.risk}</span></p>
                    <p>Vulnerabilidades Presentes: </p>
                    <ul className="vuln-list">
                        {vulnerabilities.map(vuln => (
                            <li key={vuln.id} className="vulns">
                                <p>Título:</p>
                                <span className="title">{vuln.title}</span>
                                <p>CVSS:</p>
                                <span className="cvss">{vuln.cvss}</span>
                                <p>Gravidade:</p>
                                <span className="severity">{vuln.severity}</span>
                            </li>
                        ))}   
                    </ul>                  
                    <p>Vulnerabilidades Corrigidas: </p>
                    <ul className="vuln-list">
                        {vuln_fixed.map(vf => {
                            return(
                                total.map((t) => { 
                                    if(vf === t.id){
                                        return(
                                            <li key={t.id} className="vulns">
                                                <p>Título:</p>
                                                <span className="title">{t.title}</span>
                                                <p>CVSS:</p>
                                                <span className="cvss">{t.cvss}</span>
                                                <p>Gravidade:</p>
                                                <span className="severity">{t.severity}</span>
                                            </li>
                                        );
                                    }
                            })
                            )
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}
