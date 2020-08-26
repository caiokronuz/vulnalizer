import React, {Component} from 'react';

import api from '../../services/api';

import { Pie } from 'react-chartjs-2';

export default class TopAssetsChart extends Component{
    state = {
        listHost: [],
        listVuln: [],
    }
    
    componentDidMount(){
        this.request();
    }

    request = async () => {
        const token = localStorage.getItem('app-token');
        const response = await api.get('api/dashboard/charts/top-assets', {headers:{Authorization: `Token ${token}` }});
        const {data} = response;
        const listHost = []
        const listVuln = []
        data.map(d => (listHost.push(d.host)))
        data.map(d => (listVuln.push(d.vuln_count)))
        this.setState({listHost, listVuln})
    }

    render(){
        const {listHost, listVuln} = this.state;
        const data_host = {
            labels: [...listHost],
            datasets: [
                {
                    label: 'Valores',
                    data: [...listVuln],
                    backgroundColor: [
                        '#377dc2',
                        '#f5dd42',
                        '#424bf5',
                        '#42f56f',
                        '#f54242',
                        '#42eff5',
                        '#fdc534',
                        '#ee9336',
                        '#d43f3a',
                        '#202121',
                    ]
                },
            ]
        }
        return(

            <Pie data={data_host} width={300} height={500} options={{maintainAspectRatio: false, responsive: true}}/>
        )
    }
}