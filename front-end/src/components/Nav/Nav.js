import React, { useState } from "react";
import "./Nav.css";
import { Button, Input } from "@material-ui/core";
import HighQualityIcon from "@material-ui/icons/HighQuality";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieSearch from "../Movies/MovieSearch";

function Nav() {
  const [search, setSearch] = useState("");
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=0930d6e169489c706f349c5e382ab610&language=en-TH&query=`;
  const [movie, setMovie] = useState([]);
  

  const getMovies = async (API) => {
    const request = await axios.get(API);
    setMovie(request.data.results);
  };

  const removeMovie = () => {
    setMovie([])
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if (search) {
      getMovies(searchUrl + search);
    }
    setSearch('')
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };


  const hanleClick = e => {
    e.preventDefault();
  }

  console.log(search)

  return (
    <>
      <nav className="nav">
        <Link to="/"
        onClick={removeMovie}
        >
          <div className="nav__Left">
            <h3>Movie App</h3>
            <HighQualityIcon fontSize="large" />
          </div>
        </Link>
          <form onSubmit={onSubmitHandler}>
            <Input
              placeholder="Search movie..."
              style={{ width: "250px", marginRight: "1rem", color: "white" }}
              onChange={handleOnChange}
              value={search}
            />
          </form>
      </nav>
      <div className="movie__searchContainer"onClick={removeMovie}>
      {movie.length > 0 && 
        movie.map((movies) => <MovieSearch key={movies.id} {...movies}/>)
      }
      </div>
    </>
  );
}

export default Nav;
