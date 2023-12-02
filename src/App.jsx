import { useEffect, useState } from "react";
import './App.css';
import SerachIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=33875f70';

// const movie1 = {
//   "Title": "Ivan Ironman Stewart's Super Off Road",
//   "Year": "1989",
//   "imdbID": "tt0162408",
//   "Type": "game",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BZDMwMWUyNDAtZmM3Ny00ZGM2LTg5MTItYmZiNzM1NzAyNGJmXkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg"
// }



function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const serachMovies = async (title)=> {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
  
    setMovies( data.Search );

  }


  useEffect(()=>{
      
      serachMovies("Ironman");
    
      // console.log(movies)
    
  },[search])

  return (
    <>
      <div className="app">
        <h1>Movie Stack</h1>  

        <div className="search">
          <input 
            type="text" 
            placeholder="Search for movies" 
            value = {search}
            onChange={
              (e)=>{
                setSearch(e.target.value)
              }
            }
          />
          <img 
            src={SerachIcon} 
            alt="search"
            onClick={()=>{
              serachMovies(search);
            }}
            />
        </div>
        {
          (movies?.length  > 0)
          ?
          (<div className="container">
            {
              movies.map((movie, index)=>(
                  <MovieCard movie={movie} key={index}/>
                )
              )
            }

          </div>)
          :
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>

        }

      </div>
    </>
  )
}

export default App
