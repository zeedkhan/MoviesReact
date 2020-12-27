import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import "./MovieScreen.css";
import Button from "@material-ui/core/Button";
import movieTrailer from "movie-trailer";
import ModalVideo from "react-modal-video";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Movie from "./Movie";
import requests from "../../requests";
import CardPayment from "../Payment/CardPayment";
import Axios from "axios";
import AddToCart from "../Payment/AddToCart";
import { useStateValue } from "../redux/StateProvider";

function MovieScreen() {
  const api_ImageUrl = "https://image.tmdb.org/t/p/original/";
  const [moviesId, setMoviesId] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setOpen] = useState(false);
  const { id } = useParams();
  const [charge, setCharge] = useState("");
  const [state, dispatch] = useStateValue();

  
    const cart = {
      email: "zeedkhan.tp@gmail.com",
      name: "Seed",
      amount: 15000,
    };

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        titile: moviesId.title,
        price: cart.amount / 100,
        rating: moviesId.vote_average
      }
    })
  }


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=0930d6e169489c706f349c5e382ab610&language=en-US`
      );
      setMoviesId(request.data);
    }
    fetchData();
  }, [id]);

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

  const createCreditCardCharge = async (email, name, amount, token) => {
    const res = await Axios({
      method: "post",
      contentType: "application/json",
      url: "http://localhost:80/checkout-credit-card",
      data: {
        email,
        name,
        amount,
        token,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = res.data;
    setCharge(resData);
  };


  
  console.log(charge);
  
  return (
    <div className="movieScreen__container">
      <div className="movieScreen">
        <div className="movieScreen__left">
          <div className="name">
            <div className="name__price">
            <img
              src={`${api_ImageUrl}${moviesId.poster_path}`}
              alt=""
              className="movieScreen__leftImage"
              />
              <figure className="figure">
                <button onClick={addToBasket}>Add</button>
              <h4>THB {cart.amount / 100}</h4>
              <CardPayment
                createCreditCardCharge={createCreditCardCharge}
                cart={cart}
                />
              </figure>
            </div>
            <div className="movieScreen__leftInfo">
              <div className="movieScreen__leftTitle">
                <h2>{moviesId.title}</h2>
              </div>
              <figcaption>{moviesId.overview}</figcaption>
              <div className="movieScreen__Rating">
                <p>
                  Rating <span>{moviesId.vote_average}</span>
                </p>
              </div>

              <div className="movieScreen__Release">
                <p>
                  Release Date: <span>{moviesId.release_date}</span>
                </p>
              </div>
              <div className="movieScreen__leftButton">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: "38%", marginRight: "25px" }}
                  onClick={() => handleClick(moviesId)}
                  startIcon={<PlayArrowIcon />}
                  >
                  Play
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "38%" }}
                  startIcon={<BookmarkIcon />}
                  >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {charge && (
        <div>
          <h4>Thank you {cart.name}</h4>
          <p>
            Status <span className="payment__status">{charge.status}</span>
          </p>
          <p>Total Amount Pay is : THB {charge.amount / 100}</p>
        </div>
      )}
      {trailerUrl && (
        <div>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            videoId={trailerUrl}
          />
        </div>
      )}
      <Movie title="Recommend" fetchUrl={requests.fetchTopBox} />
      <Movie title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Movie title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
}

export default MovieScreen;
