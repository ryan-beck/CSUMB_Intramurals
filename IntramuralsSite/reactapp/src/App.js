import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom"


import Header from './Header';
import MainPage from "./pages";
import SportsPage from "./pages/sports";

class App extends Component {
  render() {
	    return (
		    <Router>
			    <Header/>
			    <Switch>
			    <Route exact path="/" component={MainPage} />
			    <Route exact path="/sports" component={SportsPage} />
			    </Switch>
		    </Router>
		);
	}
}

export default App;
