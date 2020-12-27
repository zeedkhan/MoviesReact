import Axios from "axios";
import axios from "axios";
// base url

const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
});

export default instance;
