import React from "react";
import { Component } from 'react';
//import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';
import { TextInput, StyleSheet, Button } from "react-native";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormLabel from '@material-ui/core/FormLabel';
import CreateLeagueFormModal from '../components/Forms/CreateLeagueFormModal';
import CreateSportFormModal from '../components/Forms/CreateSportFormModal';

//import axios from "axios";

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
	  radio_active: true,
    };

	this.handleSearchChange = this.handleSearchChange.bind(this)
	this.adminViewSwitch = this.adminViewSwitch.bind(this);
	this.handleLeagueFormSubmit = this.handleLeagueFormSubmit.bind(this);
	this.handleSportFormSubmit = this.handleSportFormSubmit.bind(this);
	this.handleRadioChange = this.handleRadioChange.bind(this);
  }

	componentDidMount() {
		fetch("http://localhost:8000/api/getSports/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				sportsArray: result,
			  });
			  this.setState({
				displayArray: this.state.sportsArray.filter(sport => sport.is_active)
			  })
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

	handleRadioChange(evt) {
		if(evt.target.value == "Past") {
			this.setState({
				displayArray: this.state.sportsArray.filter(sport => !sport.is_active),
				radio_active: false,
			})
		} else {
			this.setState({
				displayArray: this.state.sportsArray.filter(sport => sport.is_active),
				radio_active:true,
			})
		}
	}

	updateText(evt) {
		this.setState({
		  SearchTextInput: evt.target.value,
		})
	}

	async handleSearchChange(evt)  {

		await this.updateText(evt)

		this.setState({
			displayArray: this.state.sportsArray.filter(sport => sport.sport_name.toLowerCase().includes(this.state.SearchTextInput.toLowerCase()) && sport.is_active == this.state.radio_active)
		})
	};





	render() {
		return (
			<Box>
				<span>
				<h1 className="sportTitle">View Sports</h1>
				
				{(() => {
					if (this.state.user.is_admin) {
						return (
							<div className="adminSwitch">
								<label>Toggle Admin View</label><br/>
								<label className="switch">
								  <input type="checkbox" onClick={this.adminViewSwitch}/>
								  <span className="slider round"></span>
								</label>
							</div>
						)
					}
				})()}
				
				</span>
				<br/><br/>
				<div className="searchdiv"> 
					<div>
					  <TextInput
						value = {this.state.SearchTextInput || ''}
						style={styles.input}
						placeholder=" Search for Sports"
						onChange = {this.handleSearchChange}
					  />
					  <FormControl component="fieldset">
					  <RadioGroup row aria-label="position" name="position" defaultValue="Active" >
						<FormControlLabel
						  value="Active"
						  control={<Radio color="primary" />}
						  label="Active"
						  labelPlacement="bottom"
						  onChange={this.handleRadioChange}
						/>
						<FormControlLabel
						  value="Past"
						  control={<Radio color="primary" />}
						  label="Past"
						  labelPlacement="bottom"
						  onChange={this.handleRadioChange}
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
				<Box>
					 <div className="grid-container">
						{this.state.displayArray.map((sport, index) => (
						  <div key={index}>
							<div className="grid-item">
							{(() => {
								if (this.state.isAdminView && sport.is_active) {
									return (
									<div> <CreateLeagueFormModal sportId={sport.id} sportName={sport.sport_name} handleFormSubmit={this.handleLeagueFormSubmit}/> </div>
									)
								}
							})()}
							<img className="logo" src={sport.logo_url} alt="SportLogo"/>
							<label>{sport.sport_name}</label>
							
							<div>
							{this.state.leagueArray.map((league, index) => (
							  <div key={index}>
								{(() => {
								if (sport.id == league.sport) {
									return (
									<div><a href={'/leagues/'+ sport.sport_name+'/'+league.league_name+'/'+league.id+'/'+sport.id}><h5>{league.league_name}</h5></a></div>
									)
								} else {
									return (
									<div><h1> </h1></div>
									)
								}
								})()}
							  </div>
							))}
							</div>
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