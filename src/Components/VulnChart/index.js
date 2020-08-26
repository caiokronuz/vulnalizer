import React, {Component} from 'react';

import api from '../../services/api';

import { Pie } from 'react-chartjs-2';

export default class VulnChart extends Component{
    state = {
        data: {}
    }
    
    componentDidMount(){
        this.request();
    }

    request = async () => {
        const token = localStorage.getItem('app-token');
        const response = await api.get('api/dashboard/charts/severity', {headers:{Authorization: `Token ${token}` }});
        const {data} = response;
        this.setState({data})
    }


    render(){
        const {data} = this.state;
        const data_vuln = {
            labels: ['Baixo', 'Médio', 'Alto', 'Crítico'],
            datasets: [
                {
                    label: 'Valores',
                    data: [
                        data.Baixo,
                        data.Médio,
                        data.Alto,
                        data.Crítico
                    ],
                    backgroundColor:[
                        '#377dc2',
                        '#fdc534',
                        '#ee9336',
                        '#d43f3a'
                    ]
                }
            ]
        }

        return(
            <Pie data={data_vuln}  width={300} height={300} options={{maintainAspectRatio: false, responsive: true}}/>
        )
    }
}