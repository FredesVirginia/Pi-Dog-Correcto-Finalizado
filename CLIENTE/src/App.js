import React from 'react';
import "./App.css";
import { BrowserRouter, Route} from 'react-router-dom';
import LadingPage from './Components/LadingPage/LadingPage';
import Home from "./Components/Home/Home";
import BreedDogDetails from './Components/BreedDogDetails/BreedDogDetails';
import FormBreedDog from './Components/FormBreedDog/FormBreedDog';
const App = () => {
  return (
    <div className='containerApp'>
      <BrowserRouter>
      <Route exact path='/' component={LadingPage}/>
      <Route exact path='/dogs' component={Home}/>
      <Route exact path='/dogs/:id' component={BreedDogDetails}/>
      <Route exact path='/createBreedDog' component={FormBreedDog} />
      </BrowserRouter>
    </div>
  );
}

export default App;

