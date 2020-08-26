import api from '../api';

async function count(){
    const token = localStorage.getItem('app-token')
    const response = await api.get(`api/vulnerabilities/`, {headers: {Authorization: `Token ${token}`}})
    const {count} = response.data;
    localStorage.setItem('counter', count);
}

export default count;
