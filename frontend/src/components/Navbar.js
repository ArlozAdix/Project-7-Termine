import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import logo from '../images/icon-left-font.png';

function NavBar() {

    const token = localStorage.getItem("token");
    const [user, setUser] = useState('');

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
                    <NavLink className='navbar-brand col-3' to="/">
                        <img className="img-fluid" src={logo} alt='logo' />
                    </NavLink>
                    <div  className='d-flex flex-row me-2'> 
                        {user  ? (
                                <>
                                    <h3 className='me-4' >Bienvenue {user.pseudo}</h3>
                                    <NavLink   className='btn btn-primary me-2 text-light' to="/create">Creer une publication</NavLink>
                                    <Logout />
                                </>
                            ) : ( 
                                <NavLink className='btn btn-primary me-2 text-light' to="/profil"> Connexion / inscription</NavLink>
                            )}
                        
                    </div>
            </nav>
        </div>
    )
}

export default NavBar