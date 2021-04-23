import React, { Component,Fragment } from 'react';
import axios from "axios"; 
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom"

import Header from './Header';
import MainPage from "./pages";
import SportsPage from "./pages/sports";
import LeaguePage from "./pages/leagues";
import logo from "./otterLogoTransparent.png"
import CreateSportForm from "./components/CreateSportForm";
import CreateLeagueForm from "./components/CreateLeagueForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class LoginPage extends React.Component {
    componentDidMount() {
        window.gapi.load('signin2', () => {
			const params = {
				onsuccess: () => {
					console.log('user is signed in successfully');
					var authInstance = window.gapi.auth2.getAuthInstance()
				    var profile = authInstance.currentUser.get().getBasicProfile()
					axios({
				        method:'post', 
				        url: 'http://localhost:8000/api/createAccount/', 
				        data: {
							email: profile.getEmail(),
							name: profile.getName(),
							imageUrl: profile.getImageUrl()},
			        });
				},
				onfailure: () => {
					console.log('error logging in');
				},
				theme: 'dark',
				width: 350,
        		height: 60
			}
			window.gapi.signin2.render('loginButton', params)
		})
    }

    render() {
        return (
        	<Fragment>
			<div class="split left">
				<div class="centered">
					<img className="title-image" src={logo} alt="LoginLogo"/>
					<label className="title">CSUMB Intramurals</label>
					<p>Description.</p>
				</div>
			</div>

			<div class="split right">
				<div class="centered">
					<label className="login-text">Use Your CSUMB Account to Login!</label>
					<br/><br/><br/>
					<div id="loginButton">Sign in with Google</div>
				</div>
			</div>
			</Fragment>
        );
    }
}

class App extends Component {
	constructor(props) {
        super(props)

        this.state = {
            isSignedIn: null
        }
    }

    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
        	client_id: '1071786778662-0lmd9mio92ksbhqq3h5o3est54nrcbg9.apps.googleusercontent.com',
			hosted_domain: 'csumb.edu',
			scope: 'email'
        }).then(() => {
          const authInstance =  window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          this.setState({isSignedIn})

          authInstance.isSignedIn.listen(isSignedIn => {
            this.setState({isSignedIn})
          });
        })
      });
    }

    componentDidMount() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => this.initializeGoogleSignIn();
      document.body.appendChild(script);
    }

    ifUserSignedIn(Component,props) {
        if (this.state.isSignedIn == null) {
            return (
                <h1> </h1>
            )
        }
        return this.state.isSignedIn ?
	        (<Fragment>
	        	<Header/>
	            <Component props={props}/>
	        </Fragment>) 
	        :
            (<LoginPage/>)
    }

  render() {
	    return (
	    	<Router>
			    <Switch>
				    <Route exact path="/" render={() => this.ifUserSignedIn(MainPage)}/>
				    <Route exact path="/sports" render={() => this.ifUserSignedIn(SportsPage)}/>
					<Route exact path="/admin" render={() => this.ifUserSignedIn(CreateLeagueForm)}/>
					<Route path="/leagues/:sport/:league" render={props => this.ifUserSignedIn(LeaguePage,{...props})}/>
			    </Switch>
		    </Router>
		    
		);
	}
}

export default App;
