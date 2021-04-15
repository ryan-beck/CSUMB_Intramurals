import React from "react";
import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';

import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";


import "../sports.css"


const SportsPage = () => {
	return (
		<Box>
			<h1 class="title">Sports Page</h1>
			<div class="searchdiv"> 
				<SearchTextInput/>
			</div>
		</Box>
	);
}



export default SportsPage;