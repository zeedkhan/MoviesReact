import React from "react";
import Movie from "./Movie";
import requests from "../../requests";

function MoviesAll() {
  return (
    <div>
      <Movie title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Movie title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Movie title="Animation" fetchUrl={requests.fetchAnimation} />
      <Movie title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Movie title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Movie
        title="NETFLIX ORGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Movie title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Movie title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Movie
        title="Documentaries"
        fetchUrl={requests.fetchDocumentariesMovies}
      />
    </div>
  );
}

export default MoviesAll;
