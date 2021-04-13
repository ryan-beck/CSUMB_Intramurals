import React from 'react';

const UserContext = React.createContext({
	user: {
	isLoggedIn: false,
	username: ''
}
});
export default UserContext;