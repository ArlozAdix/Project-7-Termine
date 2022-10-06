import React from "react";

function Logout() {

    const logout = () => {
        localStorage.removeItem("token");
        window.location = "/";
    }

    return (
        <button className="btn btn-secondary mx-2" onClick={logout}>Deconnexion
        </button>
    )
}

export default Logout