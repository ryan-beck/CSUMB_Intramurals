import React, { Fragment } from 'react';

import "./App.css"
import GoogleLogoutBtn from './components/GoogleLogoutHandling';

const Header = () => {
  return (
      <Fragment>
      <div class="header">
      	<div>
      	<span class="header-text">CSUMB Intramurals</span>
		  <GoogleLogoutBtn/>
		</div>
	  	<div class="navigation">
	  		<a class="navigation-button" href="/">Home</a>
	  		<a class="navigation-button" href="/sports">Sports</a>
	  	</div>
		</div>

      	</Fragment>
  );
}

export default Header;