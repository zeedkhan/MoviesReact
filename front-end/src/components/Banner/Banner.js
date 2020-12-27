import React, { useEffect, useState } from "react";
import requests from "../../requests";
import axios from "../../axios";
import "./Banner.css";

function Banner() {
  const [movie, setmovie] = useState([]);
  const api_ImageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchBanner);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  // console.log(movie);

  return (
    <header className="banner">
      <div className="banner__contents">
        <img
          src={`${api_ImageUrl}${movie?.poster_path}`}
          alt=""
          style={{ height: "750px", width: "40%" }}
        />
        <h1></h1>
        <div className="banner__buttons"></div>
      </div>
    </header>
  );
}

export default Banner;
