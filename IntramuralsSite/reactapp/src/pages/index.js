import React, { Fragment } from "react";

import SignInModal from '../components/SignInModal.js';

const MainPage = () => {
	return (
		<Fragment>
		<div>
			<h3>welcome to main</h3>
			<small>feed will be here soon</small>
		</div>
		<SignInModal/>
		</Fragment>
	);
}

export default MainPage;