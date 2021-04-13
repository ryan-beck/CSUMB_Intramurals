import React, { Fragment } from 'react';

import "./App.css"
import UserContext from './UserContext';
import GoogleLogoutBtn from './components/GoogleLogoutHandling';

function Header() {
  return (
      <Fragment>
      <div class="header">
      	<div>
      	<span class="header-text">CSUMB Intramurals</span>
      		<UserContext.Consumer>
	      		{({value}) => {
	      			<GoogleLogoutBtn value={value}/>
	      		}}
	      	</UserContext.Consumer>
		  
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