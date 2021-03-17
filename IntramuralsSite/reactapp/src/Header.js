import React, { Fragment } from 'react';
import "./App.css"

const Header = () => {
  return (
      <Fragment>
      <div class="header">
      	<div>
		  <label class="header-text">CSUMB Intramurals</label>
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