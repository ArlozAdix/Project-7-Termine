import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons'

function Post() {

    const heart = <FontAwesomeIcon icon={faHeart} />
    const disheart = <FontAwesomeIcon icon={faHeartCrack} />

    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');
    let user = false;

    if (token) {user = true}

    useEffect(() => {
        axios({
            method: "get",
            url:`http://localhost:5000/api/post/`
        })
        .then(
            (result) => {setPosts(result.data)}
        )
        .catch((err) =>{
            console.log(err);
        })
    })

    const like = props => async() => {
        await axios ({
            method: "post",
            url: `http://localhost:5000/api/post/${props}/like`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data:{
                like: 1
            }
        })
        .then((res) => { console.log(res)})
        .catch((err) => console.log(err));
    };

    const dislike = props => async() => {
        await axios ({
            method: "post",
            url: `http://localhost:5000/api/post/${props}/like`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data:{
                like: -1
            }
        })
        .then((res) => { console.log(res)})
        .catch((err) => console.log(err));
    };

    return (
            <div className="d-flex flex-column align-items-center">
            {posts.slice(0).reverse().map((post) =>{
            return <div className="card col-6 mt-5 shadow" style={{height:400}} key={post._id}>
                                <h3 className="card-header text-center bg-info">{post.title}</h3>
                                <div className="card-body d-flex flex-row overflow-hidden">
                                    <div className="flex-grow-1">
                                        <p className="card-text text-wrap">{post.content}</p>
                                    </div>
                                    <img className="mh-100 rounded " src={post.imageUrl} alt={post.title} />
                                </div>
                                <div className="card-footer d-flex flex-row bg-info">
                                    <div className=" me-2">
                                        <NavLink className="btn btn-primary text-wrap text-light" to={`/post?id=${post._id}`}>Voir la publication</NavLink>
                                    </div>
                                    <p className="h-100 text-wrap fst-italic fs-5 text"> Publié par {post.pseudo}</p>
                                    {user === true? (<>
                                        <button className="btn btn-secondary col-1 me-2 ms-auto" onClick={like(post._id)}>
                                        {post.likes} {heart}
                                        </button>
                                        <button className="btn btn-secondary col-1" onClick={dislike(post._id)}>
                                        {post.dislikes} {disheart}
                                        </button>
                                        </>
                                    ):(null)}
                                </div>
                            </div>
                })}
            </div>
    )
}

export default Post