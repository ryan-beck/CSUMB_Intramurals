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
import TeamPage from "./pages/team";
import ProfilePage from "./pages/profile";
import logo from "./otterLogoTransparent.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class LoginPage extends Component {
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
							display_name: profile.getName(),
							photo_url: profile.getImageUrl(),
							is_admin: false
						}
			        })
			        .then(({data}) => {
			        	console.log(data);
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
			<div className="split left">
				<div className="centered">
					<img className="title-image" src={logo} alt="LoginLogo"/>
					<label className="title">CSUMB Intramurals</label>
					<p>A simple and lightweight application for organizing intramural sports at CSUMB.</p>
				</div>
			</div>

			<div className="split right">
				<div className="centered">
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
        super(props);

        this.state = {
            isSignedIn: null,
            user: {}
        };
        this.setSignInStatus = this.setSignInStatus.bind(this);

    }

    setSignInStatus(signedInStatus) {
    	if (signedInStatus) {
    		const authInstance =  window.gapi.auth2.getAuthInstance();
    		const profile = authInstance.currentUser.get().getBasicProfile();
	      	const email = profile.getEmail();
	    	axios({
		        method:'get', 
		        url: 'http://localhost:8000/api/getAccountByEmail/'+email
	        })
	        .then(({data}) => {
	        	this.setState({
	        		isSignedIn: signedInStatus,
	        		user: data
	        	});
	        });
	    } else {
	    	this.setState({
        		isSignedIn: signedInStatus,
        		user: {}
        	});
	    }
    }

    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
        	client_id: '1071786778662-0lmd9mio92ksbhqq3h5o3est54nrcbg9.apps.googleusercontent.com',
			hosted_domain: 'csumb.edu',
			scope: 'email'
        }).then(() => {
          const authInstance =  window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          this.setSignInStatus(isSignedIn);


          authInstance.isSignedIn.listen(isSignedIn => {
            this.setSignInStatus(isSignedIn);
            console.log(isSignedIn);
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
	        <Fragment>
	        	<Header user={this.state.user}/>
	            <Component user={this.state.user} props={props}/>
	        </Fragment> 
	        :
            (<LoginPage/>)
    }

  render() {
	    return (
	    	<Router>
			    <Switch>
				    <Route exact path="/" render={() => this.ifUserSignedIn(MainPage)}/>
				    <Route exact path="/sports" render={() => this.ifUserSignedIn(SportsPage)}/>
					<Route exact path="/profile" render={() => this.ifUserSignedIn(ProfilePage)}/>
					<Route path="/leagues/:sport/:league/:id/:sportId" render={props => this.ifUserSignedIn(LeaguePage,{...props})}/>
					<Route path="/team/:team/:id/:captainId" render={props => this.ifUserSignedIn(TeamPage,{...props})}/>
			    </Switch>
		    </Router>
		    
		);
	}
}

export default App;