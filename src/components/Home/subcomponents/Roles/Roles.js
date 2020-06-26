import React, { useState, useEffect } from 'react';
import './roles.css';
import { Pencil, TrashFill, PersonPlusFill } from 'react-bootstrap-icons';
import firebase from '../../../../initFire';
import $ from 'jquery';

function Roles() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = 14;
    const [userEditId, setUserEditId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <div className="rolesContainer">
            <div className="tableRoles">
                <div className="header">
                    <div>
                        <img src="/assets/usuario.svg" />
                        <span>Usuarios existentes</span>
                    </div>
                    <button data-toggle="modal" data-target="#modalCreate" onClick={() => openCreate()}>Crear</button>
                </div>
                <div className="tableRolesTableContainer">
                    <table className="tableRolesTable">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Identificación (C.C)</th>
                                <th>Rol asociado</th>
                                <th>Estado</th>
                                <th>Teléfono</th>
                                <th>Correo electónico</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.slice(activePage*itemsPerPage, (activePage+1)*itemsPerPage).map((user, index) => {
                                return <tr>
                                    <th className="capitalize">{user.data().name}</th>
                                    <th className="capitalize">{user.data().surname}</th>
                                    <th>{user.data().cc}</th>
                                    <th className="capitalize">{user.data().role}</th>
                                    <th className="capitalize">{user.data().state ? 'activo' : 'inactivo'}</th>
                                    <th>{user.data().phone}</th>
                                    <th>{user.data().email}</th>
                                    <th className="thOptions">
                                        <Pencil size={20} color="#1d43ad" data-toggle="modal" data-target="#modalCreate" onClick={() => openEdit(user)} />
                                        <TrashFill size={20} onClick={() => deletUser(user.id)} />
                                    </th>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div>

                    </div>

                </div>
                {itemsPerPage < users.length ?
                    <div className="navigationContainer">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={() => activePage > 0 ? setActivePage(activePage - 1) : { }}>Anterior</a></li>
                                {Array.apply(null, { length: Math.ceil(users.length / itemsPerPage) }).map((e, i) => (
                                    <li class="page-item"><a class="page-link" onClick={() => { setActivePage(i) }}>{i}</a></li>
                                ))}
                                <li class="page-item"><a class="page-link" onClick={() => activePage < Math.ceil(users.length / itemsPerPage) ? setActivePage(activePage + 1): {} }>Siguiente</a></li>
                            </ul>
                        </nav>
                    </div> : ''
                }
            </div>
            <div className="filterMenuRoles">
                <div className="header">
                    <PersonPlusFill color="#1d43ad" size={20} />
                    <span>Filtrar busqueda</span>
                </div>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        filter();
                    }} id="formFilter">
                    <div class="form-group">
                        <label>Nombres</label>
                        <input type="text" name="name" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Apellidos</label>
                        <input type="text" name="surname" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Identificación (C.C)</label>
                        <input type="text" name="cc" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <select name="role" className="form-control">
                            <option value="" selected>Cualquiera</option>
                            {roles.map((role, index) => {
                                return <option value={role}>{role}</option>
                            })}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select name="state" className="form-control">
                            <option value="" selected >Cualquiera</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="phone" name="phone" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" name="email" className="form-control" />
                    </div>
                    <div class="buttonFormContainer">
                        <button type="submit" class="btn filterButton">Filtrar</button>
                        <button type="reset" class="btn clearButton">Limpiar</button>
                    </div>
                </form>
            </div>

            <div className="modal fade" tabindex="-1" role="dialog" id="modalCreate" data-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar nuevo usuario</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    userEditId == null ? createUser() : editUser()
                                }} id="formCreateUser">
                                <div class="form-group">
                                    <label>Nombres</label>
                                    <input type="text" name="name" className="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Apellidos</label>
                                    <input type="text" name="surname" className="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Identificación (C.C)</label>
                                    <input type="text" name="cc" className="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Role</label>
                                    <select name="role" className="form-control">
                                        <option value="" selected>Cualquiera</option>
                                        {roles.map((role, index) => {
                                            return <option value={role}>{role}</option>
                                        })}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Estado</label>
                                    <select name="state" className="form-control">
                                        <option value="" selected >Cualquiera</option>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Contraseña</label>
                                    <input type="password" name="password" className="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Teléfono</label>
                                    <input type="phone" name="phone" className="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Correo electrónico</label>
                                    <input type="email" name="email" className="form-control" />
                                </div>
                                <div class="buttonFormContainer">
                                    <button type="submit" class="btn filterButton">{userEditId == null ? 'Crear' : 'Editar'}</button>
                                    <button type="reset" class="btn clearButton">Limpiar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function filter() {
        var filterF = $('#formFilter').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var fir = firebase.firestore().collection('users');
        for (const [key, value] of Object.entries(filterF)) {
            if (value != null && value != "") {
                fir = fir.where(key, '==', value.toLowerCase())
            }
        }
        fir.get().then(querySnapshot => {
            var queryUsers = [];
            querySnapshot.forEach((doc) => {
                queryUsers.push(doc);
            })
            setUsers(queryUsers);
        });
    }

    function openCreate() {
        document.getElementById('formCreateUser').reset();
        setUserEditId(null);
    }

    function createUser() {
        var filterF = $('#formCreateUser').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        firebase.auth().createUserWithEmailAndPassword(filterF.email, filterF.password);
        firebase.firestore().collection('users').doc().set(filterF).then(response => {
            loadUsers();
            window.$('#modalCreate').modal('hide');
        }).catch(err => {
        })

    }

    function openEdit(document) {
        setUserEditId(document.id)
        var json = document.data();
        for (var key in json) {
            if (json.hasOwnProperty(key))
                $('input[name=' + key + ']').val(json[key]);
        }
    }

    function editUser() {
        var filterF = $('#formCreateUser').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        firebase.firestore().collection('users').doc(userEditId).update(filterF).then(response => {
            loadUsers();
            window.$('#modalCreate').modal('hide');
        })

    }

    function deletUser(id) {
        firebase.firestore().collection('users').doc(id).delete().then(response => {
            loadUsers();
        })
    }

    function loadUsers(){
        firebase.firestore().collection('users').get().then(querySnapshot => {
            var queryUsers = [];
            querySnapshot.forEach((doc) => {
                queryUsers.push(doc);
            })
            setUsers(queryUsers);
        });
        firebase.firestore().collection('globalvars').doc('roles').get().then(querySnapshot => {
            setRoles(querySnapshot.data().roles)
        });
    }

}

export default Roles;
