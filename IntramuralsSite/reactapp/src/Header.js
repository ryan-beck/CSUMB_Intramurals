import React, { Fragment, Component } from 'react';
import {Dropdown} from 'react-bootstrap';

import "./Header.css";
import logo from "./otterLogoTransparent.png";

class Header extends Component {
	constructor(props) {
        super(props);

        this.state = {
            user: props.user
        };
    }

    render() {
    	const authInstance = window.gapi.auth2.getAuthInstance();
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
				                    <img class="dropdown-image" src={this.state.user.photo_url} alt="UserProfilePicture"/>
				                    <label>{this.state.user.display_name}</label>
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
}

export default Header;