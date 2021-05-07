import React from "react";
import { Component } from 'react';
//import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';
import { TextInput } from "react-native";


//import axios from "axios";

import "../sports.css"


class TeamPage extends Component {
	constructor(props) {
    super(props);


    this.state = {
      sportsArray: [] ,
	  teamsArray:[],
	  searchtTextInput: " ",
	  leagueArray: [],
	  user: props.user,
	  isAdminView: false,
	  currTeam: {},
	  currLeague: {},
	  currSport: {},
	  players: [],
	  playerArray: [],
    };

	//this.grabTeamData = this.grabTeamData.bind(this)
	//this.grabLeaguebyID = this.grabLeaguebyID.bind(this)
	//this.grabSportbyID = this.grabSportbyID.bind(this)

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
			  //console.log(this.state.sportsArray)
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
			  //console.log(this.state.leagueArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		fetch("http://localhost:8000/api/getTeams/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				teamsArray: result,
			  });
			  //console.log(this.state.teamsArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		fetch("http://localhost:8000/api/getAccounts/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
					playerArray: result,
			  })
			  this.grabTeamData()
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )
	}

	grabTeamData() {
		var i 
		var array = this.state.teamsArray
		for(i = 0; i < array.length; i++ ) {
			if(array[i].id == this.props.props.match.params.id) {
				this.setState({
					currTeam: array[i],
				})
				this.grabLeaguebyID(this.state.currTeam.league)
				this.grabPlayersbyID()
				break;
			}
		}
		//console.log(this.state.currTeam)
	}

	grabLeaguebyID(league_id) {
		var i 
		var array = this.state.leagueArray
		for(i = 0; i < array.length; i++) {
			if(array[i].id == league_id) {
				this.setState({
					currLeague: array[i],
				})
				this.grabSportbyID(this.state.currLeague.sport)
				break;
			}
		}
		//console.log(this.state.currLeague)
	}

	grabSportbyID(sport_id) {
		var i
		var array = this.state.sportsArray
		for(i = 0; i < array.length; i++) {
			if(array[i].id == sport_id) {
				this.setState({
					currSport: array[i],
				})
				break;
			}
		}
		//console.log(this.state.currSport)
	}

	grabPlayersbyID() {
		var i
		var j
		var allPlayers = this.state.playerArray
		var player_ids = this.state.currTeam.players
		var temp_array = []
		for(i = 0; i < allPlayers.length; i++) {
			for(j = 0; j < player_ids.length; j++) {
				if(allPlayers[i].id == player_ids[j]) {
					temp_array.push(allPlayers[i])
				}
			}
		}
		this.setState({
			players: temp_array,
		})
		console.log(this.state.players)
	}


	render() {
		return (
			<Box>
				<h1 className="primaryTitle"> {this.props.props.match.params.team} </h1>
				<h3 className="secondaryTitle"> {this.state.currSport.sport_name} : {this.state.currLeague.league_name} </h3>
				<h4 className="teamlabel"> Players: </h4>
			</Box>
		)
	}
}




export default TeamPage;