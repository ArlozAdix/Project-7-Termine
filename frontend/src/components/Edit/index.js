import React, { useEffect, useState } from "react";
import axios from "axios";

function Edit(props) {

    const [post, setPost] = useState('');
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem("token");
    const [user, setUser] = useState('');

    const titleError = document.querySelector('.title.error');

    //GetUser
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
    .then((res) =>{
        setPost(res.data)
        setContent(res.data.content)
        setTitle(res.data.title)})

    .catch((err) => console.log(err));
        }
    });

    const handleEdit = async(e) => {
        e.preventDefault();
        
        //FormData pour Multer 
        let formData = new FormData()
        formData.append('file', file);
        formData.append('content', content);
        formData.append('title', title);
        formData.append('isAdmin', user.isAdmin);

        await axios({
            method: "put",
            url:`http://localhost:5000/api/post/${props.id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            // Tricks pour contourner le bug axios V0.25
            transformRequest: (data, headers) => {
              return formData;
            },
        })
         .then((res) => {
            console.log(res);
            window.location = '/';
         })
         .catch((err) =>{
            console.log(err)
            titleError.innerHTML = err.response.data.error.length;
         })
    };

    return (
        <div>
            <form className="rounded-3 border border-5 border-primary col-lg-9 mx-auto mt-5 p-2" action="" encType="multipart/form-data" onSubmit={handleEdit}>
                <label className="form-label" htmlFor="title" >Titre</label>
                <input 
                type="text" 
                name="title"
                className="form-control form-control-lg"
                id="title" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                placeholder="24 caracteres maximums"
                />
                <div className="text-primary title error"></div>
                <br/>
                <label className="form-label" htmlFor="content">Publication</label>
                <textarea 
                rows="10"
                type="text" 
                name="content"
                className="form-control" 
                id="content" 
                onChange={(e) => setContent(e.target.value)} 
                value={content}
                />
                <br/>

                <label className="form-label" htmlFor="file">Changer d'image</label>
                <input className="form-control"
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br/>
                <div className="text-center">
                    <input className="btn btn-primary text-light" type="submit" value="Modifier ma publication" />
                </div>
            </form>
        </div>
    )
};

export default Edit