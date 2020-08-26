import React, {useEffect, useState} from 'react';
import './styles.css';

import Header from '../../Components/Header';
import count from '../../services/store/index';


function HomePage(){

    const [hosts, setHosts] = useState([]);
    const [idHost, setIdHost] = useState();
    const [page, setPage] = useState(1);
    const [vulns, setVulns] = useState([]);
    const [next, setNext] = useState('');
    const [id, setId] = useState();

    useEffect(() => {
        loadHosts()
        count()
        loadVulns()
    }, [])

    const loadHosts = async(page = 1) => {
        try{
            const token = localStorage.getItem('app-token')
            const response = await fetch(`http://167.114.135.109/api/assets/?page=${page}`, {headers: { Authorization: `Token ${token}`}})
            const {results, next} = await response.json();
            setHosts(results);
            setNext(next);
        }catch(err){
            console.log(err)
        }
        
    };

    const loadVulns = async() => {
        const token = localStorage.getItem('app-token');
        const counter = localStorage.getItem('counter');
        const response = await fetch(`http://167.114.135.109/api/vulnerabilities/?page_size=${counter}`, {headers: { Authorization: `Token ${token}`}})
        const {results} = await response.json();
        setVulns(results);
    }

    function prevPage(){
        if(page === 1){
            return;
        }

        const pageNumber = page - 1;
        setPage(pageNumber);
        this.loadHosts(pageNumber);
    }

    function nextPage(){
       if(next === null){
           return;
       } 

       const pageNumber = page + 1;
       setPage(pageNumber);
       this.loadHosts(pageNumber);
    }

    return(
        <div id="home-page">
            
            <Header />

            <section className="content">
                <form className="filter">
                    <select id="filter-vuln" onChange={e => {setId(e.target.value)}}>
                        <option defaultChecked>Selecione uma vulnerabilidade a ser filtrada</option>
                        {vulns.map(vuln => (
                            <option key={vuln.id} value={vuln.id}>{vuln.title}</option>
                        ))}
                    </select>
                    <a href={`/filtered/${id}`}>Filtrar</a>

                    <select id="filter-vuln" onChange={e => {setIdHost(e.target.value)}}>
                        <option defaultChecked>Selecione um host a ser filtrado</option>
                        {hosts.map(h => (
                            <option key={h.id} value={h.id}>{h.hostname}</option>
                        ))}
                    </select>
                    <a href={`/host/${idHost}`}>Filtrar</a>
                </form>
                <ul className="hosts">
                    {hosts.map(host => (
                        <li key={host.id}>
                            <h1>{host.hostname}</h1>
                            <p>IP: <span>{host.ip_address}</span></p>
                            <p>Risco: <span>{host.risk}</span></p>
                            <p>Vulnerabilidades: <span>{host.vuln_count}</span></p>
                            <a href={`host/${host.id}`}>Detalhes</a>
                        </li>  
                    ))}   
                </ul>

                <div className="pages">
                    <button onClick={prevPage}>Anterior</button>
                    <p>{page}</p>
                    <button onClick={nextPage}>Próximo</button>
                </div>

            </section>
        </div>
    );
}

export default HomePage;