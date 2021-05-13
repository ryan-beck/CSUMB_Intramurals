import React from "react";
import { Component, useState, useEffect } from 'react';
import {Accordion, Card, Button, Table} from 'react-bootstrap'
import "../../style/profile.css"

class ProfilePastSports extends Component {
	constructor(props) {
    super(props);


    this.state = {
		user: props.user,
		teamsArray: [],
		eventsArray: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/getProfilePastInfoByUser/"+this.state.user.id).then(res => res.json()).then(
      (result) => {
        this.setState({
          eventsArray: result
        });
      },
      (error) => {
        console.log("Error in database call")
      }
    )
  }

	render() {
		return (
			<div>
			<Accordion>
			{this.state.eventsArray.map((team, index) => (
				<div key={index}>
					<Card>
						<Card.Header>
						<Accordion.Toggle as={Card.Header} variant="link" eventKey={"profile"+index}>
							<label><b>{team.league_name}</b>: {team.team_name}</label>
						</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey={"profile"+index}>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>vs</th>
										<th>Time of Game</th>
                                        <th>Outcome</th>
										<th>Score</th>
									</tr>
								</thead>
								<tbody>
									{(() => {
										if (team.game_data.length == 0) {
											return (
												<tr> 
													<td>
														You do not have any previous games to display.
													</td>
												</tr>
											);
										}
									})()}
									{team.game_data.map((game, indexj) => (
										
											<tr key={indexj}>
												<td>{game.vs} </td>
												<td>{game.gameTime}</td>
                                                <td>{game.outcome}</td>
												<td>{game.home_score} - {game.away_score}</td>
											</tr>
										
									))}
								</tbody>
							</Table>
						</Card.Body>
						</Accordion.Collapse>
					</Card>
				</div>
			))}
			</Accordion>
			</div>
		)
	}
}




export default ProfilePastSports;


