import React, { useState } from 'react';
import './login.css';
import { Lock, Person, XCircleFill } from 'react-bootstrap-icons';
import $ from 'jquery';
import firebase from '../../initFire';
function Login(props) {

    var [errorEmail, setErrorEmail] = useState(null);
    var [errorPassword, setErrorPassword] = useState(null);
    return (
        <div className="containerLogin">
            <div className="bgImgLogin" >
            </div>
            <div className="mainContainerLogin">
                <div className="welcomeTitleLogin">
                    <h5>Aplicación <br /> OLSoftware</h5>
                    <span>Prueba prácicta Front-end Senior</span>
                </div>
                <div className="containerFormLogin">
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            login();
                        }} id="formLogin">
                        <h5>Inicio sesión</h5>
                        <div className="inputsLoginContainer">
                            <div className="inputLogin">
                                <input type="email" required name="email" className="form-control" placeholder="Usuario" onChange={() => setErrorEmail(null)} />
                                {errorEmail == null ? <Person size={24} color="#555555" /> : <XCircleFill size={24} color="#ff0000" />}
                            </div>
                            <div className="inputLogin">
                                <input type="password" required name="password" className="form-control" placeholder="Contraseña" onChange={() => setErrorPassword(null)} />
                                {errorPassword == null ? <Lock size={24} color="#555555" /> : <XCircleFill size={24} color="#ff0000" />}
                            </div>
                        </div>
                        {errorPassword != null || errorEmail != null ? <span id="errorLoginText">{errorEmail || errorPassword}</span> : ''}
                        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                    </form>
                </div>

            </div>
            <div className="olsMark">
                OLSoftware - 2018
            </div>
            <div className="modal" tabindex="-1" role="dialog" id="modalLoginOpen">
                <div className="modal-dialog modal-dialog-centered">
                    <div>Estamos preparando todo para tí</div>
                    <div className="dotsLoadingContainer">
                        <div className="dotLoading"></div>
                        <div className="dotLoading"></div>
                        <div className="dotLoading"></div>
                    </div>
                </div>
            </div>

        </div>
    );


    function login() {
        var loginF = $('#formLogin').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        firebase.auth().signInWithEmailAndPassword(loginF.email, loginF.password).then(response => {
            localStorage.setItem('authUser', JSON.stringify(response));
            props.history.push('/roles');
        }).catch(error => {
            switch (error.code) {
                case "auth/user-not-found":
                    setErrorEmail("Correo no valido");
                    break;
                case "auth/wrong-password":
                    setErrorPassword("Contraseña incorrecta");
                    break;
            }
        });
    }
}

export default Login;
