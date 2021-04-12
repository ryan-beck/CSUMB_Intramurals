import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom"

import SignInModal from './components/SignInModal'
import Header from './Header';
import MainPage from "./pages";
import SportsPage from "./pages/sports";
import 'bootstrap/dist/css/bootstrap.min.css';

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
