import React, { Component } from 'react';
import axios from "axios"; 
import { GoogleLogin } from 'react-google-login';

const CLIENT_ID =
  '1071786778662-0lmd9mio92ksbhqq3h5o3est54nrcbg9.apps.googleusercontent.com';

class GoogleLoginBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));

      var profile = response.getBasicProfile();

      axios({
        method:'post', 
        url: 'http://localhost:8000/api/login/', 
        params: {
          email: profile.getEmail(),
          name: profile.getName(),
          imageUrl: profile.getImageUrl()}});
    }
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
    console.log('Login failed: res:', response);
  }

  render() {
    return (
    <div>
      <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
          hostedDomain={'csumb.edu'}
        />
      { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null }

    </div>
    )
  }
}

export default GoogleLoginBtn;