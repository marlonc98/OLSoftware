import React, { useState } from 'react';
import './home.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Roles from './subcomponents/Roles/Roles';
import { Map, ListUl, PersonPlus, List, BoxArrowRight, X } from 'react-bootstrap-icons';
import firebase from '../../initFire';

function Home(props) {
    const [showFullSideBar, setShowFullSideBar] = useState(true);

    return (
        <div className="homeContainer">
            {!showFullSideBar?
                <div className="onlyPhone bgSlider" onClick={()=>setShowFullSideBar(true)}></div>:''
            }
            <div className={"slideBar " + (showFullSideBar? 'showSideBarHome':'slideAnimation')}>
                <div className="titleSlideBar">
                    <div className="circleSlideBar" />
                    <span>OLSoftware</span>
                </div>
                <Link to="#">
                    <Map size={24} />
                    <span>Programación <span>&#9660;</span></span>
                    
                </Link>
                <Link to="#">
                    <ListUl size={24} />
                    <span>Gestion de operaciones <span>&#9660;</span></span>
                    
                </Link>
                <Link to="#">
                    <img src="/assets/ajustar.svg" />
                    <span>Perfiles <span>&#9660;</span></span>
                    
                </Link>
                <Link to="/roles" className={props.location.pathname == "/roles" ? "menuSelected" : ""}>
                    <h5>R</h5>
                    <span>Roles</span>
                </Link>
                <Link to="#">
                    <h5>U</h5>
                    <span>Usuario</span>
                </Link>
                <Link to="#">
                    <img src="/assets/documents.svg" />
                    <span>Reportes <span>&#9660;</span></span>
                    
                </Link>
            </div>
            <div className="routesContainer">
                <header>
                    <div className="titleContainer">
                        {showFullSideBar?
                        <List size={24} color="#1d43ad" onClick={()=>setShowFullSideBar(false)}/> :
                        <X size={24} color="#1d43ad" onClick={()=>setShowFullSideBar(true)}/> 
                        }
                        Prueba Front-end
                    </div>
                    <div className="containerProfileInfo">
                        <div className="imgProfileHeader">
                            {localStorage.getItem('authUser') != null && JSON.parse(localStorage.getItem('authUser')).photoURL != null ?
                                <img src={JSON.parse(localStorage.getItem('authUser')).photoURL} /> :
                                <img src="/assets/perfil.jpg" />
                            }
                        </div>
                        <span className="onlyPc">
                            {localStorage.getItem('authUser') != null && JSON.parse(localStorage.getItem('authUser')).displayName ? JSON.parse(localStorage.getItem('authUser')).displayName : 'Sin nombre'}

                        </span>
                        {<BoxArrowRight size={24} color="#1d43ad" onClick={() => logout()} />}
                    </div>
                </header>
                <div>
                    <BrowserRouter>
                        <Route exact path={"/roles"} component={Roles} />
                    </BrowserRouter>

                    <footer>
                        OLSoftware - 2018
                </footer>
                </div>

            </div>

        </div>
    )

    function logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            localStorage.removeItem('authUser')
            props.history.push('/');
        });
    }
}

export default Home;
