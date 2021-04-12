import React, { Component } from 'react';
import axios from "axios"; 
import { GoogleLogout } from 'react-google-login';

const CLIENT_ID =
  '1071786778662-0lmd9mio92ksbhqq3h5o3est54nrcbg9.apps.googleusercontent.com';

class GoogleLogoutBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));

    axios({
      method:'post', 
      url: 'http://localhost:8000/api/logout/',
    });
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
          hostedDomain={ 'csumb.edu' }
        >
        </GoogleLogout>
    </div>
    )
  }
}

export default GoogleLogoutBtn;