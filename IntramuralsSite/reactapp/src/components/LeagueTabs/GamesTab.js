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
            currWeek: 0, 
            isEditing: false
        };

        this.sortGamesByDate = this.sortGamesByDate.bind(this);
        this.getCurrWeek = this.getCurrWeek.bind(this);
        this.handleGenerationFormSubmit = this.handleGenerationFormSubmit.bind(this);
        this.updateGameScoreState = this.updateGameScoreState.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:8000/api/getEventsByLeague/'+this.state.leagueId)
        .then(res => res.json())
        .then((res) => {
            var data = this.sortGamesByDate(res);
            let currWeek = this.getCurrWeek(data, false);
        	this.setState({
        		sortedGames: [...data],
                currWeek: currWeek,
        	});
        });
    }

    shouldComponentUpdate(nextProps, nexState) {
        if(this.props.isAdminView && !nextProps.isAdminView && this.state.isEditing) {
            alert("Error: scores were not submitted");
            window.location.reload();
        }
        if(this.props.isAdminView != nextProps.isAdminView)
            return true;
        return !this.props.isAdminView;
        
    }

    handleGenerationFormSubmit (games) {
        let data = this.sortGamesByDate(games, true);
        this.setState({
            sortedGames: data,
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

    updateGameScoreState (week, game, isHomeScore, score) {
        this.setState({
            isEditing: true
        });
        const games = [...this.state.sortedGames];
        if(isHomeScore)
            games[week][game].home_score = score;
        else
            games[week][game].away_score = score;
        
        
        console.log(this.state.sortedGames[week][game]);
        
    }

    handleAdminSwitch () {

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
                                                <CollapsibleContent games={this.state.sortedGames} weekIndex={index} teamsArray={this.state.teamsArray} isAdminView={this.props.isAdminView} update={this.updateGameScoreState}/>
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
                {this.props.games[this.props.weekIndex].map((game, index) => (
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
                            if(this.props.isAdminView) {
                                return (
                                    <div className="game-grid-item"> 
                                        <p>{this.convertDateString(game.start_time)}</p>
                                        <label className="team-name">{awayTeam.team_name}</label> 
                                        <input className="team-score" type="text" placeholder={this.props.games[this.props.weekIndex][index].away_score} onChange={e => this.props.update(this.props.weekIndex, index, false, e.target.value)}></input>
                                        <br/>
                                        <label className="team-name">{homeTeam.team_name} </label>
                                        <input className="team-score" type="text" placeholder={this.props.games[this.props.weekIndex][index].home_score} onChange={e => this.props.update(this.props.weekIndex, index, true, e.target.value)} ></input>
                                    </div>
                                )
                            }
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