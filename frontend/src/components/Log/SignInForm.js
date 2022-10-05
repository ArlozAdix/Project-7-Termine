import React, { useState } from "react";
import axios from 'axios'

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const[password, setPassword] =  useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url:`http://localhost:5000/api/user/signin`,
            data: {
                email,
                password
            },
        })
            .then((res) => {
                    localStorage.setItem("token",`${res.data.token}`);
                    window.location = '/';
            })
            .catch((err) =>{
                emailError.innerHTML = err.response.data.message;
                passwordError.innerHTML = err.response.data.message;
                console.log(err);
            })
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <form className=" rounded-3 border border-5 border-primary col-3 p-3 mt-5" action="" onSubmit={handleLogin} id="sign-up-form">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                    type="text" 
                    name="email"
                    className="form-control form-control"
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    />
                    <div className="text-danger email error p-2"></div>
                    <label className="form-label" htmlFor="password">Mot de passe</label>
                    <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    />
                    <div className=" text-danger password error p-2"></div>
                    <br/>
                    <div className="text-center">
                        <input className="col- btn btn-primary mb-3 text-light" type="submit" value="Se connecter" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignInForm