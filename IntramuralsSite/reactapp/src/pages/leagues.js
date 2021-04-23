import React from "react";
import { Component } from 'react';
import Box from '@material-ui/core/Box';
//import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";



//import axios from "axios";

import "../sports.css"


class LeaguePage extends Component {
	constructor(props) {
    super(props);


    this.state = {
      sportsArray: [] ,
	  displayArray: [],
	  searchtTextInput: " ",
	  leagueArray: [],
    };

  }



	componentDidMount() {
		//console.log(this.props.props.match.params)
		fetch("http://localhost:8000/api/getSports/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				sportsArray: result,
				displayArray: result,
			  });
			  console.log(this.state.sportsArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		fetch("http://localhost:8000/api/getLeagues/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				leagueArray: result,
			  });
			  console.log(this.state.leagueArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )
	}




	render() {
		return (
			<Box>
				<h1 className="title">{this.props.props.match.params.sport}: {this.props.props.match.params.league}</h1>
				<div>
					<h4 className="teamlabel">Teams: </h4>
					<Box className="teamBox"> 
					</Box>
				</div>
			</Box>
		)
	}
}



export default LeaguePage;