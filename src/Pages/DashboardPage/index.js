import React, { Component } from 'react';

import api from '../../services/api';

import Header from '../../Components/Header';
import VulnChart from '../../Components/VulnChart';
import TopAssetsChart from '../../Components/TopAssetsChart';

import './styles.css';


export default class DashboardPage extends Component{
    state = {
        assets: {},
        vulns: {},
        risk_avg: '',
        data_severity: [],
    }

    componentDidMount(){
        this.requests();
    }

    requests = async() =>{
        try{
            const token = localStorage.getItem('app-token');
            const asset = await api.get('api/dashboard/cards/asset', {headers:{Authorization: `Token ${token}` }});
            const data_assets = asset.data;
            const vulns = await api.get('api/dashboard/cards/vulnerability', {headers:{Authorization: `Token ${token}` }});
            const data_vulns = vulns.data;
            const avg = await api.get('api/dashboard/cards/risk', {headers:{Authorization: `Token ${token}` }});
            const {risk_avg} = avg.data;
            this.setState({assets: data_assets, vulns: data_vulns, risk_avg});
        }catch(err){
            console.log(err)
        }
    }


    render(){
        const {assets, vulns, risk_avg} = this.state;
        return(
            <div id="dashboard-page">
                <Header />
                <div className="row">
                    <section className="container host-card">
                        <h1>Contagem de Hosts</h1>
                        <p>Hosts: <span>{assets.asset_count}</span></p>
                        <p>Hosts Vulneraveis: <span>{assets.vulnerable_asset_count}</span></p>
                    </section>
        
                    <section className="container vulns-card">
                        <h1>Contagem de vulnerabilidades</h1>
                        <p>Total de vulnerabilidades: <span>{vulns.vuln_count}</span></p>
                        <p>Total de vulnerabilidades ativas: <span>{vulns.active_vuln_count}</span></p>
                    </section>
        
                    <section className="container risk-card">
                        <h1>Média de risco dos hosts</h1>
                        <p>Média: <span>{risk_avg}</span></p>
                    </section>
                </div>
            
                    <div id="chart">
                        <h1>Distribuição de Vulnerabilidades</h1>
                        <VulnChart />
                    </div>
    
                    <div id="chart">
                        <h1>Top 10 Hosts (N. Vulnerabilidades)</h1>   
                        <TopAssetsChart />
                    </div>  
            </div>
        );
    }
}