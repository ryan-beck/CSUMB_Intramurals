import React from "react";
import { Component, Fragment } from 'react';
import TeamsTab from '../components/LeagueTabs/TeamsTab';
import GamesTab from '../components/LeagueTabs/GamesTab';
import StandingsTab from '../components/LeagueTabs/StandingsTab';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import CreateTeamFormModal from '../components/Forms/CreateTeamFormModal';

import axios from "axios";

import "../sports.css"


class LeaguePage extends Component {
	constructor(props) {
    super(props);


    this.state = {
		user: props.user,
		sportsArray: [] ,
		displayArray: [],
		searchtTextInput: " ",
		teamsArray: null,
		playerArray: [],
		isAdminView: false,
		sportIsActive: null,
		league: {}
    };

    this.adminViewSwitch = this.adminViewSwitch.bind(this);
    this.hasLeagueBegun = this.hasLeagueBegun.bind(this);

  }

  componentDidMount() {
	fetch("http://localhost:8000/api/getTeamsByLeague/" + this.props.props.match.params.sport + '/' + this.props.props.match.params.league)
	.then(res => res.json())
	.then(
	  (result) => {
		this.setState({
		  teamsArray: result,
		});
	  }
	)

	fetch('http://localhost:8000/api/getSportById/'+this.props.props.match.params.sportId)
        .then(res => res.json())
        .then((res) => {
            this.setState({
				sportIsActive: res.is_active
			});
        });

    fetch('http://localhost:8000/api/getLeagueById/'+this.props.props.match.params.id)
        .then(res => res.json())
        .then((res) => {
        	this.setState({
				league: res
			});
        });
  }

	adminViewSwitch() {
		this.setState({
			isAdminView: !this.state.isAdminView
		});
	}

	hasLeagueBegun() {
		var parts =String(this.state.league.start_date).split('-');
		var today = new Date();
		var mydate = new Date(parts[0], parts[1] - 1, parts[2]);

		return mydate < today;
	}

	render() {
		return (
			<div className="paddingLeague">
				{(() => {
					if (this.state.sportIsActive && !this.hasLeagueBegun()) {
						return (
							<span className="editSpan">
								<CreateTeamFormModal user={this.state.user} leagueId={this.props.props.match.params.id}/> 
							</span>
						)
					}
				})()}
				<label className="leagueTitle"><b>{this.props.props.match.params.sport}:</b> &nbsp;{this.props.props.match.params.league}</label>
				{(() => {
					if (this.state.user.is_admin) {
						return (
						<Fragment>
							<div className="adminSwitch">
								<label>Toggle Admin View</label><br/>
								<label className="switch">
								  <input type="checkbox" onClick={this.adminViewSwitch}/>
								  <span className="slider round"></span>
								</label>
							</div>
							<br/><br/>
							</Fragment>
						)
					}
				})()}
				<Tabs>
				
					<TabList>
						<Tab>Teams</Tab>
						<Tab>Games</Tab>
						<Tab>Standings</Tab>
					</TabList>
				
					{/* TODO onclick for panels to update tab state*/}
					<TabPanel>
						{ this.state.sportIsActive != null && this.state.teamsArray != null ? <TeamsTab props={this.props.props} teamsArray={this.state.teamsArray} user={this.state.user} sportIsActive={this.state.sportIsActive} leagueId={this.props.props.match.params.id} isAdminView={this.state.isAdminView}/> : null }
						
					</TabPanel>
					<TabPanel>
						{ this.state.teamsArray != null ? <GamesTab leagueId={this.props.props.match.params.id} teamsArray={this.state.teamsArray} isAdminView={this.state.isAdminView}/> : null }
					</TabPanel>
					<TabPanel>
						<StandingsTab/>
					</TabPanel>
				</Tabs>
			</div>
		)
	}
}



export default LeaguePage;