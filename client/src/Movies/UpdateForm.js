import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const initialMovie ={
    title: '',
    director: '',
    metascore:''
}

const UpdateForm = props =>{

const [movie, setMovie] = useState(initialMovie)
const { id } = useParams()

useEffect(()=>{
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
        setMovie(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}, [])

const changeHandler = e =>{
    e.persist()
    let value = e.target.value
    setMovie({
        ...movie,
        [e.target.name]: value
    })
}

const submitHandler = e =>{
    e.preventDefault()
    axios
    .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res=>{
        props.setMovies(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

return(
    <div>
        <form onSubmit={submitHandler}>
            Edit Movie:<br/>
            <label>
                Title:
                <input
                type="text"
                name="title"
                value={movie.title}
                onChange={changeHandler}
                />
            </label>
            <label>
                Director:
                <input
                type="text"
                name="director"
                value={movie.director}
                onChange={changeHandler}
                />
            </label>
            <label>
                Metascore:
                <input
                type="text"
                name="metascore"
                value={movie.metascore}
                onChange={changeHandler}
                />
            </label>
            <button>submit</button>
        </form>
    </div>
)
}

export default UpdateForm