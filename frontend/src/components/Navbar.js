import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import logo from '../images/icon-left-font.png';

function NavBar() {

    const token = localStorage.getItem("token");
    const [user, setUser] = useState('');

    // GetUser, Recupere les informations de l'utilisateur
    useEffect(() => {
        axios({
        method: "get",
        url: `http://localhost:5000/api/user`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {setUser(res.data)})
    .catch((err) => console.log(err));
})

    return (
        <div className='container-fluid'>
            <nav className='border-primary navbar navbar-light border' >
                    <NavLink className='navbar-brand col-sm-3' to="/">
                        <img className="img-fluid" src={logo} alt='logo' />
                    </NavLink>
                        {/* Affiche que l'utilisateur est Admin si c'est le cas */}
                        {user.isAdmin === true ? (
                            <>
                                <h3 className=''>Utilisateur Admin</h3>
                            </>
                        ) : (null)}
                        {/* Affiche un message de bienvenue si l'utilisateur est connecte */}
                        {user  ? (
                                <div>
                                    <h3 className='mx-2' >Bienvenue {user.pseudo}</h3>
                                    <NavLink   className='btn btn-primary text-light mx-2' to="/create">Creer une publication</NavLink>
                                    <Logout />
                                </div>
                            ) : ( 
                                <NavLink className='btn btn-primary text-light mx-2' to="/profil"> Connexion / inscription</NavLink>
                            )}
            </nav>
        </div>
    )
}

export default NavBar