import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom"

import UserContext from './UserContext';

import SignInModal from './components/SignInModal'
import Header from './Header';
import MainPage from "./pages";
import SportsPage from "./pages/sports";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      user: {}
	    };

	    this.login = this.login.bind(this);
	}

	login(name) {
		this.setState({user: {
			isLoggedin: true,
			username: name
		}});
	}

  render() {
  	const value = {
  		user: this.state.user,
  		loginUser: this.login
  	}
	    return (
	    	<UserContext.Provider value={value}>
		    <Router>
			    <Header text="test"/>
			    <Switch>
			    <Route exact path="/" component={MainPage} />
			    <Route exact path="/sports" component={SportsPage} />
			    </Switch>
		    </Router>
		    </UserContext.Provider>
		);
	}
}

export default App;
