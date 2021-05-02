import React from "react";
import { Component, useState, useEffect } from 'react';


class MySports extends Component {
	constructor(props) {
    super(props);


    this.state = {
		user: props.user,
		teamsArray: props.teamsArray,
    };
  }



	// componentDidMount() {
    //     fetch("http://localhost:8000/api/getTeamsByUser/"+this.state.user.id).then(res => res.json()).then(
	// 		(result) => {
	// 			this.setState({
	// 				teamsArray: result
	// 			});
	// 			console.log(this.state.teamsArray)
	// 		},
	// 		(error) => {
	// 			console.log("Error in database call")
	// 		}
	// 	)
	// }


	handleSearchChange(evt)  {
		
	};


	render() {
		return (
			<div>
			{this.state.teamsArray.map((team, index) => (
				<span>{team.team_name}</span>
			))}
			</div>
			
		)
	}
}




export default MySports;