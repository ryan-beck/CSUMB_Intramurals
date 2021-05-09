import React from "react";
import { Component } from 'react';
import axios from "axios";
import Collapsible from 'react-collapsible';

import '../../style/GamesTab.css'
import GenerateScheduleFormModal from "../Forms/GenerateScheduleFormModal";

class GamesTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leagueId: props.leagueId,
            teamsArray : this.props.teamsArray, 
            sortedGames: [],
            currWeek: 0
        };

        this.sortGamesByDate = this.sortGamesByDate.bind(this);
        this.getCurrWeek = this.getCurrWeek.bind(this);
        this.handleGenerationFormSubmit = this.handleGenerationFormSubmit.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:8000/api/getEventsByLeague/'+this.state.leagueId)
        .then(res => res.json())
        .then((res) => {
            let sortedGames = this.sortGamesByDate(res);
            let currWeek = this.getCurrWeek(sortedGames, false);
        	this.setState({
        		sortedGames: sortedGames,
                currWeek: currWeek
        	});
        });
    }

    handleGenerationFormSubmit (games) {
        this.setState({
            sortedGames: this.sortGamesByDate(games, true)
        })
    }

    sortGamesByDate (games, fromPost) {
        if(games.length == 0)
            return []
        let res = {};
        games.forEach(element => {
            let date = fromPost ? element.start_time.split(" ")[0]: element.start_time.split("T")[0];
            console.log("date: " + date);
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

    getCurrWeek (games) {
        if(games.length == 0)
            return 0
        var now = new Date();
        // var now = new Date("2021-09-16");
        let i = 0;
        let gameDate = new Date(games[i][0].start_time.split("T")[0]);
        while (now > gameDate && i < games.length-1) {
            console.log("Now: " + now);
            console.log("gameDate: " + gameDate);
            i++;
            gameDate = new Date(games[i][0].start_time.split("T")[0]);
        }
        return i;
    }


    render() {
        return (
            <div>
                {(() => {
                    if(this.state.sortedGames.length == 0){
                        return (
                            <div className="no-games-div"> 
                                <h1 className="no-games">No games for this league yet</h1>
                                {(() => {
                                    if(this.props.isAdminView) {
                                        return (
                                            <GenerateScheduleFormModal handleFormSubmit={this.handleGenerationFormSubmit} leagueId={this.state.leagueId}/>
                                        )
                                    }
                                })()}   
                            </div>
                        )
                    }
                    else {
                        return (
                            <div> 
                                {this.state.sortedGames.map((week, index) => (
                                <div key={index}>
                                    {(() => {
                                        let open = this.state.currWeek == index ? true : false;
                                        return (
                                            <Collapsible trigger={week[0].start_time.split("T")[0]} open={open}>
                                                <CollapsibleContent games={week} teamsArray={this.state.teamsArray}/>
                                            </Collapsible>
                                        )
                                    })()}
                                </div>
                                ))}
                            </div>
                        )
                    }
                })()}

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

        this.convertDateString = this.convertDateString.bind(this);

    }

    // TODO: need to fix this
    convertDateString (str) {
        // let time = fromPost ? str.split(" ")[1] : str.substring(0, str.length-1).split("T")[1];
        // time = time.substring(0, time.length-3);
        // let hour = time.split(":")[0];
        // if(hour == 12)
        //     return time + " P.M.";
        // else if(hour < 12)
        //     return time + " A.M.";
        // else if(hour == 0) 
        //     return "12" + time.substring(2) + " A.M.";
        // else
        //     return (hour%12) + time.substring(2) + " P.M.";
        return str;
    }

    render () {
        return (
            <div className="game-grid-container">
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
                                <div className="game-grid-item"> 
                                    <p>{this.convertDateString(game.start_time)}</p>
                                    <label className="team-name">{awayTeam.team_name}</label> 
                                    <label className="team-score">{game.away_score}</label>
                                    <br/>
                                    <label className="team-name">{homeTeam.team_name} </label>
                                    <label className="team-score">{game.home_score}</label>
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