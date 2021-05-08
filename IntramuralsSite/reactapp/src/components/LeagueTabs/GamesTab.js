import React from "react";
import { Component } from 'react';
import axios from "axios";
import Collapsible from 'react-collapsible';


class GamesTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games : [],
            teamsArray : this.props.teamsArray
        };

        this.sortGamesByDate = this.sortGamesByDate.bind(this);

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

    sortGamesByDate (games) {
        let res = {};
        games.forEach(element => {
            let date = element.start_time.split("T")[0];
            if(!res[date])
                res[date] = [element];
            else
                res[date].push(element);
        });

        let keys = Object.keys(res);
        keys = keys.sort();

        let sortedGames = []
        for(let i = 0; i < keys.length; i++) {
            sortedGames.push(res[keys[i]]);
        }
        return sortedGames;
    }


    render() {
        let sortedGames = this.sortGamesByDate(this.state.games);
        return (
            <div>
                {sortedGames.map((week, index) => (
                    <div key={index}>
                        {(() => {
                            return (
                                <Collapsible trigger={week[0].start_time.split("T")[0]}>
                                    <CollapsibleContent games={week} teamsArray={this.state.teamsArray}/>
                                </Collapsible>
                            )
                            
                            // let gameDate = game.start_time.split("T")[0];
                            // let changed = false;
                            // if(!currDate || currDate != gameDate){ 
                            //     currDate = gameDate;
                            //     changed = true;
                            // }
                            // let homeTeam = null;
                            // let awayTeam = null;
                            // this.state.teamsArray.forEach(element => {
                            //     if(parseInt(game.home_team) === element.id)
                            //         homeTeam = element;
                            //     if(parseInt(game.away_team) === element.id)
                            //         awayTeam = element;
                            // });
                            // if(changed) {
                            //     return (
                            //         <div>
                            //             <h3>{currDate}</h3>
                            //             <p>{awayTeam.team_name} @ {homeTeam.team_name}</p>
                            //             {/* <h1>{game.away_team} @ {game.home_team}</h1> */}
                            //         </div>  
                            //     )
                            // } else {
                            //     return (
                            //         <div>
                            //             <p>{awayTeam.team_name} @ {homeTeam.team_name}</p>
                            //             {/* <h1>{game.away_team} @ {game.home_team}</h1> */}
                            //         </div>
                                     
                            //     )
                            // } 
                        })()}
                    </div>
				))}
            </div>
        )
    }
}


class CollapsibleContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games : props.games,
            teamsArray : props.teamsArray
        };

    }


    render () {
        return (
            <div>
                {this.state.games.map((game, index) => (
                    <div key={index}>
                        {(() => {
                            let homeTeam = null;
                            let awayTeam = null;
                            this.state.teamsArray.forEach(element => {
                                if(parseInt(game.home_team) === element.id)
                                    homeTeam = element;
                                if(parseInt(game.away_team) === element.id)
                                    awayTeam = element;
                            });
                            return (
                                <p>{homeTeam.team_name} @ {awayTeam.team_name}</p>
                            )
                            
                        })()}
                    </div>
				))}
            </div>
        )
    }
}

export default GamesTab;