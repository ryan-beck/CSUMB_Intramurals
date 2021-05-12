import React from "react";
import { Component, useState, useEffect } from 'react';
import {Accordion, Card, Button, Table} from 'react-bootstrap'


class MySports extends Component {
	constructor(props) {
    super(props);


    this.state = {
		user: props.user,
		teamsArray: [],
		eventsArray: [],
    };
  }

  componentWillMount() {
    fetch("http://localhost:8000/api/getProfileInfoByUser/"+this.state.user.id).then(res => res.json()).then(
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
			{ this.state.eventsArray.length == 0 &&
				<div>
					<p>You have not joined a team yet!</p>
				</div>
			}
			{ this.state.eventsArray.length > 0 &&
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
								{ team.upcoming_game_data.length == 0 &&
									<p>You have no games left this season.</p>
								}
								{team.upcoming_game_data.length > 0 &&
									<div>
										<h1>Upcoming Games</h1>
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>vs</th>
													<th>Time of Game</th>
												</tr>
											</thead>
											<tbody>
												{team.upcoming_game_data.map((game, indexj) => (
													
														<tr>
															<td>{game.vs} </td>
															<td>{game.gameTime}</td>
														</tr>
													
												))}
											</tbody>
										</Table>
									</div>
								}
								<h1>Past Games this Season</h1>
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
										{team.past_game_data.map((game, indexj) => (
											
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
			}
			</div>
		)
	}
}




export default MySports;


