import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const VITE_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQwZjgxNDI3NDFjNjU1NDI3Y2M4YjI3YmFmNmZlZCIsIm5iZiI6MTc2NTcyMzgzNS4yOTMsInN1YiI6IjY5M2VjZWJiNzA5YjU2MTU3M2FlY2RmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-KVI-9rd-3knbKOgqxOa6Azd0TzUhNu71nNXR1opjvU"

const TitleCards = ({title,category}) => {
   
 const [apiData, setApiData] = useState([]);

  const cardsref = useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + VITE_API_KEY
  }
};




  const handlewheel = (event) => {
    event.preventDefault();
    cardsref.current.scrollLeft += event.deltaX;
  }

  useEffect(() => {
fetch(`https://api.themoviedb.org/3/movie/${category?category:"popular"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsref.current.addEventListener ('wheel',handlewheel);
  }, []);


  return (

    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsref}>
       
          {apiData.map((card, index) => {
            return <Link to = {`/player/${card.id}`} className='card' key = {index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>  



          })}
  
    </div>
    </div>

  )
}
export default TitleCards