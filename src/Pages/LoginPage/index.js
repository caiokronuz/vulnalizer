import React, {useState} from 'react';

import './styles.css';

import api from '../../services/api';

import { Formik, Form, ErrorMessage, Field } from 'formik';
import {history} from '../../services/history'

function LoginPage(){
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    function handleSubmit(e){
        api.post('api-token-auth/', {
            "username": user,
            "password": pass
        })
            .then(resp => {
                const token = resp.data.token
                if (token) {
                    localStorage.setItem('app-token', token)
                    return history.push('/dashboard');
                }
            })

            .catch(() => {
                alert("Usuário ou senha incorretos")
            })
            
    }

    return(
        <div id="login-page">
            <header className="cabecalho">
                <h1>Vulnalizer</h1>
                <p>Plataforma para analise de vulnerabilidades</p>
            </header>
            <Formik 
                initialValues={{}} 
                onSubmit={handleSubmit}
                //validationSchema={validations}
            >
                <Form className="login-area">
                    <div className="form-group">
                        <Field 
                            type="text"
                            className="input"
                            name="user"
                            value={user}
                            onChange={(e) => {setUser(e.target.value)}}
                            placeholder="Usuário"
                        />
                        <ErrorMessage 
                            className='login-error'
                            component="span"
                            name="user"
                        />   
                    </div>
                    <div className="form-group">
                        <Field 
                            type="password"
                            className="input"
                            name="pass"
                            value={pass}
                            onChange={(e) => {setPass(e.target.value)}}
                            placeholder="Senha"
                        />
                        <ErrorMessage 
                            className='login-error'
                            component="span"
                            name="pass"
                        />
                    </div>

                    <button type="submit">Logar</button>
                </Form>
            </Formik>
        </div>
    );
}

export default LoginPage;