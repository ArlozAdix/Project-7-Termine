import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordConfirmError = document.querySelector('.password-confirm.error');

        passwordConfirmError.innerHTML = "";

        if (password !== controlPassword) {
            passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
        } else {
            await axios ({
                method: "post",
                url: `http://localhost:5000/api/user/signup`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
            .then((res) => {window.location="/profil"})
            .catch((err) => console.log(err));
        }
    };

    return (
        <>
        <div className="d-flex justify-content-center">
                <form className=" rounded-3 border border-5 border-primary col-3 p-3 mt-5" action="" onSubmit={handleRegister} id="sign-up-form">
                    <label className="form-label" htmlFor="pseudo">Pseudonyme</label>
                    <input 
                    type="text" 
                    name="pseudo" 
                    className="form-control form-control"
                    id="pseudo" 
                    onChange={(e) => setPseudo(e.target.value)} 
                    value={pseudo}
                    />
                    <label class="form-label" htmlFor="email">Email</label>
                    <input 
                    type="text" 
                    name="email" 
                    className="form-control form-control"
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    />
                    <label className="form-label" htmlFor="password">Mot de passe</label>
                    <input 
                    type="password" 
                    name="password" 
                    className="form-control form-control"
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    />
                    <label className="form-label" htmlFor="password-conf">Confirmation du mot de passe</label>
                    <input 
                    type="password" 
                    name="password" 
                    className="form-control form-control"
                    id="password-conf" 
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={controlPassword} 
                    />
                    <div className="password-confirm error p-2 text-danger"></div>
                    <div className="mt-4 text-center">
                        <input className="col-4 btn btn-primary mb-3 text-light" type="submit" value="Valider l'inscription" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUpForm