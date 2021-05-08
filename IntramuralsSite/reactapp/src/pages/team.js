import React from "react";
import { Component } from 'react';
//import SearchTextInput from "../SearchBar";
import Box from '@material-ui/core/Box';
import { TextInput } from "react-native";
import { Card } from 'react-bootstrap';

//import axios from "axios";

import "../team.css"


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
	  captain: {},
    };

	this.grabTeamData = this.grabTeamData.bind(this)
	this.grabLeaguebyID = this.grabLeaguebyID.bind(this)
	this.grabSportbyID = this.grabSportbyID.bind(this)
	this.grabPlayersbyID = this.grabPlayersbyID.bind(this)
	this.functionController = this.functionController.bind(this)
	this.sleep = this.sleep.bind(this)
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
			  }, () =>{this.functionController()})
			  console.log("WHY IS THIS LATE",this.state.playerArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )
	}

	sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	async functionController() {
		await this.grabTeamData()
		await this.sleep(500)
		await this.grabLeaguebyID()
		await this.sleep(500)
		await this.grabSportbyID()
		await this.sleep(500)
		await this.grabPlayersbyID()
	}


	grabTeamData() {
		var i 
		var array = this.state.teamsArray
		for(i = 0; i < array.length; i++ ) {
			if(array[i].id == this.props.props.match.params.id) {
				this.setState({
					currTeam: array[i],
				})
				break;
			}
		}

		console.log(this.state.currTeam)
	}

	grabLeaguebyID() {
		var i 
		var array = this.state.leagueArray
		for(i = 0; i < array.length; i++) {
			if(array[i].id == this.state.currTeam.league) {
				this.setState({
					currLeague: array[i],
				})
				break;
			}
		}
		console.log(this.state.currLeague)
	}

	grabSportbyID() {
		var i
		var array = this.state.sportsArray
		for(i = 0; i < array.length; i++) {
			if(array[i].id == this.state.currLeague.sport) {
				this.setState({
					currSport: array[i],
				})
				break;
			}
		}
		console.log(this.state.currSport)
	}

	grabPlayersbyID() {
		var i
		var j
		var allPlayers = this.state.playerArray
		var player_ids = this.state.currTeam.players
		var temp_array = []
		console.log(this.state.playerArray)
		for(i = 0; i < allPlayers.length; i++) {
			for(j = 0; j < player_ids.length; j++) {
				if(allPlayers[i].id == player_ids[j]) {
					temp_array.push(allPlayers[i])
				}
			}
		}

		for(i = 0; i < temp_array.length; i++) {
			if(temp_array[i].id == this.state.currTeam.captain) {
				this.setState({
					players: temp_array,
					captain: temp_array[i]
				})
				break;
			}
		}
		
		console.log(this.state.captain)
	}


	render() {
		return (
			<Box>
				<h1 className="primaryTitle"> {this.props.props.match.params.team} </h1>
				<h3 className="secondaryTitle"> {this.state.currSport.sport_name} : {this.state.currLeague.league_name} </h3>
				<div className="card_container">
					<div className="team_card">
						<Card style={{ width: '30rem' }}>
						  <Card.Body>
							<Card.Title><img className="profile_pic" width="50" height="40" src={this.state.captain.photo_url}/>{this.state.captain.display_name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted tester">Captain</Card.Subtitle>	
						  </Card.Body>
						</Card>
						<Card style={{ width: '30rem' }}>
						  <Card.Body>
							{this.state.players.map((player, index) => (
								  <div key={index}>
									{(() => {
									if (player.id == this.state.captain.id) {
										return (
											<div></div>
										)
									} else {
										return (
											<Card.Text className="player_cards"><img className="profile_pic" width="50" height="40" src={player.photo_url}/>{player.display_name}</Card.Text>
										)
									}
									})()}
								  </div>
								))}
						  </Card.Body>
						</Card>
					</div>
					<div className="game_card">
						<Card style={{ width: '45rem' }}>
						  <Card.Body>
							<Card.Title>Game 1: Kool Otter vs Beans Team</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">Tuesday May 43rd - 8:00PM</Card.Subtitle>
							<Card.Text> Score: 0-0 </Card.Text>

						  </Card.Body>
						</Card>
					</div>
				</div>
			</Box>
		)
	}
}




export default TeamPage;