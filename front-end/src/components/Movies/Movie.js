import React, { useEffect, useState } from "react";
import "./Movie.css";
import movieTrailer from "movie-trailer";
import axios from "../../axios";
import ModalVideo from "react-modal-video";
import "../../modal-video-sass.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Movie({ title, fetchUrl }) {
  const api_ImageUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const truncate = (str, n) => {
    // Add ... in the end of the overview with specified string
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const data = request.data.results;
      setMovies(data);
    }
    fetchData();
  }, [fetchUrl]);
console.log(movies)
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setOpen(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map((movie) => (
          <div>
            <img
              onClick={() => handleClick(movie)}
              src={`${api_ImageUrl}${movie.backdrop_path}`}
              alt={movie.title}
              className="row__poster"
            />
            <Button
              variant="contained"
              style={{
                borderRadius: '20px',
                backgroundColor: "rgba(204, 204, 204, 0.5)",
                width: "90%",
              }}
              className="row__poster"
            >
              <Link
                to={`/movies/${movie.id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Click to see overview
              </Link>
            </Button>
          </div>
        ))}
      </div>
      {trailerUrl && (
        <div>
          <ModalVideo
            channel="youtube"
            autoplay="0"
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            videoId={trailerUrl}
          />
        </div>
      )}
    </div>
  );
}

export default Movie;
