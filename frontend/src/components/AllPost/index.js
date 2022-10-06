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

    //Fonction Like
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

    //Fonction dislike
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
            <div className="">
                {posts.slice(0).reverse().map((post) =>{
                return <div className="col-lg-9 mx-auto card mt-5 shadow" key={post._id}>
                                    <h3 className="card-header text-center bg-info">{post.title}</h3>

                                    <div className="row g-0 m-2">
                                        <div className="col-md-8">
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                        {post.imageUrl ? (
                                        <div className="col-md-4">
                                            <img className="img-fluid rounded" src={post.imageUrl} alt={post.title} />
                                        </div>
                                        ) : (null)}
                                    </div>

                                    <div className="card-footer d-flex flex-row bg-info">
                                        <NavLink className="btn btn-primary text-light my-auto" to={`/post?id=${post._id}`}>Voir la publication</NavLink>
                                        <p className="fst-italic fs-6 m-auto"> Publié par {post.pseudo}</p>
                                        {user === true? (<>
                                            <button className="btn btn-secondary me-2" onClick={like(post._id)}>
                                            {post.likes} {heart}
                                            </button>
                                            <button className="btn btn-secondary" onClick={dislike(post._id)}>
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