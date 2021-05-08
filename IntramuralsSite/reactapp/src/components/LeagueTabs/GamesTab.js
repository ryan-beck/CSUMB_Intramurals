import React from "react";
import { Component } from 'react';
import axios from "axios";


class GamesTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games : [],
            teamsArray : this.props.teamsArray
        };



    }


    componentDidMount() {
        fetch('http://localhost:8000/api/getEventsByLeague/'+this.props.leagueId)
        .then(res => res.json())
        .then((res) => {
        	this.setState({
        		games: res
        	});
        });
    }


    render() {
        console.log("games tab");
        console.log(this.state.teamsArray);
        let currDate = null;
        return (
            <div>
                {this.state.games.map((game, index) => (
                    <div key={index}>
                        {(() => {
                            let gameDate = game.start_time.split("T")[0];
                            let changed = false;
                            if(!currDate || currDate != gameDate){ 
                                currDate = gameDate;
                                changed = true;
                            }
                            let homeTeam = null;
                            let awayTeam = null;
                            this.state.teamsArray.forEach(element => {
                                if(parseInt(game.home_team) === element.id)
                                    homeTeam = element;
                                if(parseInt(game.away_team) === element.id)
                                    awayTeam = element;
                            });
                            if(changed) {
                                return (
                                    <div>
                                        <h3>{currDate}</h3>
                                        <p>{awayTeam.team_name} @ {homeTeam.team_name}</p>
                                        {/* <h1>{game.away_team} @ {game.home_team}</h1> */}
                                    </div>  
                                )
                            } else {
                                return (
                                    <div>
                                        <p>{awayTeam.team_name} @ {homeTeam.team_name}</p>
                                        {/* <h1>{game.away_team} @ {game.home_team}</h1> */}
                                    </div>
                                     
                                )
                            } 
                        })()}
                    </div>
				))}
            </div>
        )
    }
}

export default GamesTab;