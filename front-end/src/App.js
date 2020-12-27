import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route, Router, Switch} from "react-router-dom";
import MoviesAll from "./components/Movies/MoviesAll";
import MovieScreen from "./components/Movies/MovieScreen";
import MovieSearch from "./components/Movies/MovieSearch";

function App() {

  return (
    <BrowserRouter>
    <Switch>
      <div className="app">
        <Nav />
        {/* <Banner /> */}
        <Route exact path="/">
          <MoviesAll />
        </Route>
        <Route path="/movies/:id" component={MovieScreen}></Route>

      </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
