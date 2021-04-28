import React from "react";
import { Component, useState, useEffect } from 'react';
//import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CreateLeagueFormModal from '../components/CreateLeagueFormModal';
import CreateSportFormModal from '../components/CreateSportFormModal';


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
	  user: props.user,
	  isAdminView: false,
    };

	this.handleSearchChange = this.handleSearchChange.bind(this)
	this.adminViewSwitch = this.adminViewSwitch.bind(this);
	this.handleLeagueFormSubmit = this.handleLeagueFormSubmit.bind(this);
	this.handleSportFormSubmit = this.handleSportFormSubmit.bind(this);
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

	adminViewSwitch() {
		this.setState({
			isAdminView: !this.state.isAdminView
		});
	}

	handleLeagueFormSubmit(newLeague) {
		this.setState ({
			leagueArray : this.state.leagueArray.concat(newLeague)
		});
	}

	handleSportFormSubmit(newSport) {
		this.setState ({
			sportsArray: this.state.sportsArray.concat(newSport),
			displayArray: this.state.displayArray.concat(newSport)
		})
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
				<span className="top">
				<h1 class="title">Sports Page</h1>
				
				{(() => {
					if (this.state.user.is_admin) {
						return (
							<Button
								onPress={this.adminViewSwitch}
								title="Switch admin view"
							/>
						)
					}
				})()}
				
				</span>
				<br/><br/>
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
				{(() => {
					if (this.state.isAdminView) {
						return (
							<div> <CreateSportFormModal handleFormSubmit={this.handleSportFormSubmit}/> </div>
						)
					}
				})()}
				<Box class="league_display">
					 <div>
						{this.state.displayArray.map((sport, index) => (
						  <div key={index}>
							<span className="sportRow">
							<h3>{sport.sport_name}</h3>
							{(() => {
								if (this.state.isAdminView) {
									return (
									<div> <CreateLeagueFormModal sportId={sport.id} sportName={sport.sport_name} handleFormSubmit={this.handleLeagueFormSubmit}/> </div>
									)
								}
							})()}
							</span>
							
							<div>
							{this.state.leagueArray.map((league, index) => (
							  <div key={index}>
								{(() => {
								if (sport.id == league.sport) {
									return (
									<div><a href="#"><h5>{league.league_name}</h5></a></div>
									)
								} else {
									return (
									<div><h1></h1></div>
									)
								}
								})()}
							  </div>
							))}
							</div>
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