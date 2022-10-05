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
        <div className="d-flex flex-column align-items-center">
            <div className="card col-8 mt-5 shadow" style={{height:400}} key={post._id}>
                            <h3 className="card-header text-center">{post.title}</h3>
                            <div className="card-body d-flex flex-row overflow-hidden">
                                <div className="flex-grow-1">
                                    <p className="card-text text-wrap">{post.content}</p>
                                </div>
                                <img className="mh-100 rounded" src={post.imageUrl} alt={post.title} />
                            </div>
                            <div className="card-footer d-flex flex-row">
                                <div className=" me-2">
                                    <NavLink className="btn btn-primary text-wrap" to="/">Voir toutes les publications</NavLink>
                                </div>
                                <p className="h-100 text-wrap fst-italic fs-5 text"> Publié par {post.pseudo}</p>
                                {user._id === post.userId || user.isAdmin === true?(
                                <>
                                    <button className="btn btn-secondary col-2 me-2 ms-auto" onClick={editPost}>
                                    Editer le post
                                    </button>
                                    <button className="btn btn-secondary col-2" onClick={supprPost}>
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