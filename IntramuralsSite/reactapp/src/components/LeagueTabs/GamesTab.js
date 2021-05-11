import React from "react";
import { Component } from 'react';
import axios from "axios";
import Collapsible from 'react-collapsible';

import '../../style/GamesTab.css';
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
        this.updateGameScoreState = this.updateGameScoreState.bind(this);
        this.submitGameScores = this.submitGameScores.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.formatCollapsibleDate = this.formatCollapsibleDate.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:8000/api/getEventsByLeague/'+this.state.leagueId)
        .then(res => res.json())
        .then((res) => {
            var data = this.sortGamesByDate(res);
            let currWeek = this.getCurrWeek(data);
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

    sortGamesByDate (games, fromPost) {
        if(games.length == 0)
            return []
        let res = {};
        games.forEach(element => {
            let date = fromPost ? element.start_time.split(" ")[0]: element.start_time.split("T")[0];

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

    submitGameScores() {
        axios({
            method:'put', 
            url: 'http://localhost:8000/api/updateScores/' + this.state.leagueId, 
            data: [].concat(...this.state.sortedGames)
        })
        .then(({data}) => {
            // console.log(data);
            localStorage.setItem('default', 1);
            window.location.reload();
        });
    }

    cancelEdit() {
        localStorage.setItem('default', 1);
        window.location.reload();
    }

    formatCollapsibleDate(date) {
        var parts =String(date).split('-');
        return parts[1]+'-'+parts[2]+'-'+parts[0]
    }


    render() {
        return (
            <div className="bottomSpacing">
                {(() => {
                    if(this.state.sortedGames.length == 0){
                        return (
                            <div className="no-games-div"> 
                                <label>No games for this league yet.</label>
                                {(() => {
                                    if(this.props.isAdminView) {
                                        return (
                                            <GenerateScheduleFormModal leagueId={this.state.leagueId}/>
                                        )
                                    }
                                })()}   
                            </div>
                        )
                    }
                    else {
                        if(this.props.isAdminView) {
                            return (
                                <div> 
                                    <div className="gameButtonFormat">
                                        <button className="scoreButtons saveButton" onClick={this.submitGameScores}>Save Edit</button>
                                        <label className="buttonSpacing"></label>
                                        <button className="scoreButtons cancelButton" onClick={this.cancelEdit}>Cancel Edit</button>
                                    </div>
                                    {this.state.sortedGames.map((week, index) => (
                                        <div key={index}>
                                            {(() => {
                                                let open = this.state.currWeek == index ? true : false;
                                                let date = this.formatCollapsibleDate(week[0].start_time.split("T")[0])
                                                return (
                                                    <Collapsible trigger={date} open={open}>
                                                        <CollapsibleContent games={this.state.sortedGames} weekIndex={index} teamsArray={this.state.teamsArray} isAdminView={this.props.isAdminView} update={this.updateGameScoreState}/>
                                                    </Collapsible>
                                                )
                                            })()}
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        return (
                            <div> 
                                {this.state.sortedGames.map((week, index) => (
                                <div key={index}>
                                    {(() => {
                                        let open = this.state.currWeek == index ? true : false;
                                        let date = this.formatCollapsibleDate(week[0].start_time.split("T")[0])
                                        return (
                                            <Collapsible trigger={date} open={open}>
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

    convertDateString (str) {
        let time = str.substring(0, str.length-1).split("T")[1];
        time = time.substring(0, time.length-3);
        let hour = time.split(":")[0];
        if(hour == 12)
            return time + " P.M.";
        else if(hour < 12)
            return time + " A.M.";
        else if(hour == 0) 
            return "12" + time.substring(2) + " A.M.";
        else
            return (hour%12) + time.substring(2) + " P.M.";
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
                                        <br/><hr/>
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
                                    <br/><hr/>
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