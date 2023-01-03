import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CrearPokemon from "./components/CrearPokemon";
import Detail from "./components/PokemonDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/crear-pokemon" component={CrearPokemon} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
