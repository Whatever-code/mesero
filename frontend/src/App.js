import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigations from './Components/Navigations'
import ListComandas from './Components/ListComandas'
import CreateComanda from './Components/CreateComanda'
import CreatePlato from './Components/CreatePlato'

function App() {
  return (
    <Router>
      <Navigations />

      <div className="container p-4">
        <Route path="/" exact component={ListComandas} />
        <Route path="/comanda" component={CreateComanda} />
        <Route path="/plato" component={CreatePlato} />
      </div>
      
    </Router>
  );
}

export default App;
