import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import movieTrailer from "movie-trailer";
import "./MovieSearch.css";

function MovieSearch({ title, poster_path, overview, vote_average, id }) {
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setOpen] = useState(false);

  const setVoteClass = (vote) => {
    if (vote >= 9) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  const handleClick = (moviesId) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(moviesId?.title || moviesId?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setOpen(true);
        })
        .catch((error) => console.log(error));
    }
  };
  
  return (
    <div>
      <Link
        to={`/movies/${id}`}
        style={{ color: "white", textDecoration: "none" }}
      >
        <div className="movie__search">
          <img src={IMG_API + poster_path} alt={title} />
          <div className="movie__searchInfo">
            <h3>{title}</h3>
            <span className={`tag ${setVoteClass(vote_average)}`}>
              {vote_average}
            </span>
          </div>
          <div className="movie__searchOverview">
            <h2>Overview</h2>
            <p>{overview}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieSearch;
