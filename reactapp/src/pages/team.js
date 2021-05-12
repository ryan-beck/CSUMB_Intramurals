import React from "react";
import { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { TextInput } from "react-native";
import { Card } from 'react-bootstrap';
import "../style/team.css"
import axios from "axios";


class TeamPage extends Component {
	constructor(props) {
    super(props);


    this.state = {
    	teamId: this.props.props.match.params.id,
    	captainId: this.props.props.match.params.captainId,
    	players: [],
    	user: props.user,
		isAdminView: false,
		sportName:"",
		leagueName: "",
		gamesArray: [],
		leagueId: null,
		sportId: null,
		team: {}
    };

    this.sortPlayers = this.sortPlayers.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
	fetch("http://localhost:8000/api/getPlayersByTeamId/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				players: res
			});
			this.sortPlayers();
		}
	);

	fetch("http://localhost:8000/api/getTeamById/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				team: res,
				leagueId: res.league
			})

			fetch("http://localhost:8000/api/getLeagueById/"+res.league)
				.then(res => res.json())
				.then((res) => {
					this.setState({
						leagueName: res.league_name,
						sportId: res.sport
					});
					
					fetch("http://localhost:8000/api/getSportById/"+res.sport)
						.then(res => res.json())
						.then((res) => {
							
							this.setState({
								sportName: res.sport_name
							});
						}
					);
				}
			);
		}
	);

	fetch("http://localhost:8000/api/getGamesByTeam/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				gamesArray: res
			});
		}
	);
  }

  sortPlayers() {
  	for(let i = 0; i < this.state.players.length; i++) {
  		if(this.state.players[i].id == this.state.captainId) {
  			var captain = this.state.players[i];
  			this.state.players.splice(i, 1);
  			this.state.players.unshift(captain)
  			break
  		}
  	}
  }

  deleteHandler(event) {
    axios({
        method:'delete', 
        url: 'http://localhost:8000/api/deleteTeam/'+this.state.teamId,
    })
    .then(({data}) => {
        window.location = ('/leagues/'+ this.state.sportName+'/'+this.state.leagueName+'/'+this.state.leagueId+'/'+this.state.sportId);
    });
}

	render() {
		return (
			<Box className="beginning">
			<div>
				<label className="record"><b>Wins:</b> {this.state.team.wins}<br/> <b>Losses:</b> {this.state.team.losses}<br/> <b>Ties:</b> {this.state.team.ties}</label>
				<h1 className="primaryTitle"> {this.props.props.match.params.team} </h1>
				<label className="secondaryTitle"> {this.state.sportName} : {this.state.leagueName} </label>
				</div>
				{(() => {
					if (this.state.user.id == this.state.captainId) {
						return (
							<Fragment>
								<span className="captain-view">
								<input name="deleteButton" className="delete-team" type="button" value="Delete This Team" onClick={this.deleteHandler}/>
								</span>
								<br/><br/>
							</Fragment>
						)
					}
				})()}
				<div className="card_container">
					<div className="team_card">
						
						<Card style={{ width: '30rem' }}>
						  <Card.Body>
							{this.state.players.map((player, index) => (
								  <div key={index}>
									{(() => {
									if (player.id == this.state.captainId) {
										return (
											<div>
												<Card.Title><img className="profile_pic" src={player.photo_url}/>{player.display_name}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted tester">Captain</Card.Subtitle>
												<hr/>
											</div>
										)
									} else {
										return (
											<Card.Text className="player_cards">
												<img className="profile_pic" src={player.photo_url}/>{player.display_name}</Card.Text>
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
						  	{(() => {
								if (this.state.gamesArray.length == 0) {
									return (
										<div className="no-games"> 
											<label>
												There are currently no games to display.
											</label>
										</div>
									);
								}
							})()}
						  {this.state.gamesArray.map((game, index) => (
								  <div key={index}>
									<Card.Title>{game.home_name} vs {game.away_name}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">{game.format_start_time}</Card.Subtitle>
									<Card.Text> Score: {game.home_score}-{game.away_score} </Card.Text><hr/>
								  </div>
								))}
						  </Card.Body>
						</Card>
					</div>
				</div>
			</Box>
		)
	}
}




export default TeamPage;