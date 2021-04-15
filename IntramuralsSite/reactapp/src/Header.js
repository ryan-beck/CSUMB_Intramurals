import React, { Fragment } from 'react';
import {Dropdown} from 'react-bootstrap';

import "./Header.css";
import logo from "./otterLogoTransparent.png";

const Header = () => {
	const authInstance = window.gapi.auth2.getAuthInstance();
	const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();
    const name = profile.getName();
    const imageUrl = profile.getImageUrl();
		return (
			<Fragment>
				<div class="header">
					<div>
						<span>
							<img class="header-image" src={logo} alt="HeaderLogo"/>
							<a class="header-text" href="/">CSUMB Intramurals</a>
						</span>
						<span class="dropdown">				
							<Dropdown >
			                    <Dropdown.Toggle class="dropdown-text" as="a" >
				                    <img class="dropdown-image" src={imageUrl} alt="UserProfilePicture"/>
				                    <label>{name}</label>
			                    </Dropdown.Toggle>
			                    <Dropdown.Menu>
			                        <Dropdown.Item onClick={authInstance.signOut}>Sign out</Dropdown.Item>
			                    </Dropdown.Menu>
			                </Dropdown>
		                </span>
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