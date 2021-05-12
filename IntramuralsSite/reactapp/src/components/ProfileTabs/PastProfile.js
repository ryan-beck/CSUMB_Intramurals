import React from "react";
import { Component, useState, useEffect } from 'react';
import {Accordion, Card, Button, Table} from 'react-bootstrap'


class ProfilePastSports extends Component {
	constructor(props) {
    super(props);


    this.state = {
		user: props.user,
		teamsArray: [],
		eventsArray: [],
    };
  }

  componentWillMount() {
    fetch("http://localhost:8000/api/getProfilePastInfoByUser/"+this.state.user.id).then(res => res.json()).then(
      (result) => {
        this.setState({
          eventsArray: result
        });
        console.log(this.state.eventsArray)
      },
      (error) => {
        console.log("Error in database call")
      }
    )
  }

	// handleSearchChange(evt)  {
		
	// };


	render() {
		return (
			<div>
			<Accordion>
			{this.state.eventsArray.map((team, index) => (
				<div>
					<Card>
						<Card.Header>
						<Accordion.Toggle as={Card.Header} variant="link" eventKey={"profile"+index}>
							{team.league_name  + " " + team.team_name}
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
									{team.game_data.map((game, indexj) => (
										
											<tr>
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


