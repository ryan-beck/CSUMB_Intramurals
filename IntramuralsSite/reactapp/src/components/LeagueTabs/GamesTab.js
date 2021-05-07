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
        return (
            <div>
                {this.state.games.map((game, index) => (
                    <div key={index}>
                        {(() => {
                            return (
                                <div>
                                    {/* <h1>{this.state.teamsArray[game.away_team].team_name} @ {this.state.teamsArray[game.home_team].team_name}</h1> */}
                                </div>
                                 
                            )
                        })()}
                    </div>
				))}
            </div>
        )
    }
}

export default GamesTab;