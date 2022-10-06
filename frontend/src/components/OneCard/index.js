import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from "axios";

function OneCard(props) {

    const [post, setPost] = useState('');
    const token = localStorage.getItem("token");
    const [user, setUser] = useState('');

    //GetUser informations
    useEffect(() => {
        if( !user) {axios({
        method: "get",
        url: `http://localhost:5000/api/user`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {setUser(res.data)})
    .catch((err) => console.log(err));
    }
})

    //Get Post informations
    useEffect(() => {
        if( !post) {
    axios({
        method: "get",
        url:`http://localhost:5000/api/post/${props.id}`
    })
    .then((res) =>{setPost(res.data)})
    .catch((err) => console.log(err));
        }
    });

    //Edit button
    const editPost = () => {
        window.location=`/edit?id=${props.id}`
    }
    
    //Suppr button
    const supprPost = async () => {
        await axios ({
            method: "delete",
            url: `http://localhost:5000/api/post/${props.id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                isAdmin: user.isAdmin
            }
        })
        .then((res) => {
           console.log(res);
           window.location = '/';
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
        <div className="">
            <div className="col-lg-9 mx-auto card mt-5 shadow" key={post._id}>
                            <h3 className="card-header text-center bg-info">{post.title}</h3>

                            <div className="row g-0 m-2">
                                        <div className="col-md-8">
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img className="img-fluid rounded" src={post.imageUrl} alt={post.title} />
                                        </div>
                                    </div>

                            <div className="card-footer d-flex flex-row bg-info">
                                <NavLink className="btn btn-primary text-light my-auto" to="/">Voir toutes les publications</NavLink>
                                <p className="fst-italic fs-6 m-auto"> Publié par {post.pseudo}</p>
                                {user._id === post.userId || user.isAdmin === true?(
                                <>
                                    <button className="btn btn-secondary me-2" onClick={editPost}>
                                    Editer le post
                                    </button>
                                    <button className="btn btn-secondary" onClick={supprPost}>
                                    Supprimer le post
                                    </button>
                                </>
                    ): (null)}
                            </div>
                        </div>
        </div>
        </>
    )};

export default OneCard