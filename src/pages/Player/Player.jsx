import React, { useEffect,useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

const [apiData, setApiData] = React.useState({
  name: '',
  key: '',
  published_at: '',
  typesof: ''
})

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQwZjgxNDI3NDFjNjU1NDI3Y2M4YjI3YmFmNmZlZCIsIm5iZiI6MTc2NTcyMzgzNS4yOTMsInN1YiI6IjY5M2VjZWJiNzA5YjU2MTU3M2FlY2RmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-KVI-9rd-3knbKOgqxOa6Azd0TzUhNu71nNXR1opjvU'
  }
};
useEffect(() => {
     fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[]);




  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}` }
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
            <p>{apiData.typesof}</p>
      </div>
    </div>
  )
}

export default Player
