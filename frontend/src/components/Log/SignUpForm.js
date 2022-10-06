import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const pseudoError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Verifie si els deux mots de passes correspondent
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
            .catch((err) => {console.log(err)
                pseudoError.innerHTML = err.response.data.error.pseudo;
                emailError.innerHTML = err.response.data.error.email;
                passwordError.innerHTML = err.response.data.error.password;

            });
        }
    };

    return (
        <>
        <div>
                <form className="rounded-3 border border-5 border-primary col-lg-9 mx-auto mt-5 p-2" action="" onSubmit={handleRegister} id="sign-up-form">
                    <label className="form-label" htmlFor="pseudo">Pseudonyme</label>
                    <input 
                    type="text" 
                    name="pseudo" 
                    className="form-control form-control"
                    id="pseudo" 
                    onChange={(e) => setPseudo(e.target.value)} 
                    value={pseudo}
                    placeholder="Minimum 6 carateres"
                    />
                    <div className="text-primary pseudo error"></div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                    type="text" 
                    name="email" 
                    className="form-control form-control"
                    id="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="nom@email.com"
                    />
                    <div className="text-primary email error"></div>
                    <label className="form-label" htmlFor="password">Mot de passe</label>
                    <input 
                    type="password" 
                    name="password" 
                    className="form-control form-control"
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    />
                    <div className="text-primary password error"></div>
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