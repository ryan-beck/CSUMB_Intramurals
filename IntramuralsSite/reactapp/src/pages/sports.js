import React from "react";
import { Component, useState, useEffect } from 'react';
//import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import axios from "axios";

import "../sports.css"


class SportsPage extends Component {
	constructor(props) {
    super(props);


    this.state = {
      sportsArray: [] ,
	  displayArray: [],
	  searchtTextInput: " ",
	  leagueArray: [],
    };

	this.handleSearchChange = this.handleSearchChange.bind(this)

  }



	componentDidMount() {
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


	handleSearchChange(evt)  {
		this.setState({
		  SearchTextInput: evt.target.value
		});

		if(this.state.SearchTextInput != " ") {
			this.setState({
			  displayArray: this.state.sportsArray.filter(sport => sport.sport_name.includes(this.state.SearchTextInput))
			});
		}
		//console.log(this.state.displayArray)
		//console.log(this.state.SearchTextInput)
	};


	render() {
		return (
			<Box>
				<h1 class="title">Sports Page</h1>
				<div class="searchdiv"> 
					<div>
					  <TextInput
						value = {this.state.SearchTextInput}
						style={styles.input}
						placeholder=" Search for Sports"
						onChange = {this.handleSearchChange}
					  />
					  <FormControl component="fieldset">
					  <RadioGroup row aria-label="position" name="position" defaultValue="top">
						<FormControlLabel
						  value="top"
						  control={<Radio color="primary" />}
						  label="Active"
						  labelPlacement="bottom"
						/>
						<FormControlLabel
						  value="start"
						  control={<Radio color="primary" />}
						  label="Past"
						  labelPlacement="bottom"
						/>
					  </RadioGroup>
					</FormControl>
				</div>
				</div>
				<Box class="league_display">
					 <div>
						{this.state.displayArray.map((sport, index) => (
						  <div key={index}>
							<h3>{sport.sport_name}</h3>
						  </div>
						))}
					 </div>
				</Box>
			</Box>
		)
	}
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "50%",
    margin: "auto",
    borderWidth:2,
  },
});



export default SportsPage;