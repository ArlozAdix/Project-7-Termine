import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = ( props ) => {
    // Choix de l'affichage du component SignIn ou SignUp en premier via props
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    // (e) = event
    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
                setSignInModal(true);
                setSignUpModal(false);
            }
    }

    return(
        <div>
            <div >
                <ul className="d-flex justify-content-center mt-5">
                    <li  onClick={handleModals} id="register" className={signUpModal?"active-btn btn btn-primary me-2 text-light" : "btn btn-secondary me-2"}>S'inscrire</li>
                    <li  onClick={handleModals} id="login" className={signInModal?"active-btn btn btn-primary me-2 text-light" : "btn btn-secondary me-2"}>Se connecter</li>
                </ul>
            </div>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
        </div>
    );
};

export default Log