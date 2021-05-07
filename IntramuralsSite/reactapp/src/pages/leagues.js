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
		isAdminView: false,
		teamsArray : []
    };

    this.adminViewSwitch = this.adminViewSwitch.bind(this);

  }

  componentDidMount() {
	fetch("http://localhost:8000/api/getTeamsByLeague/" + this.props.props.match.params.sport + '/' + this.props.props.match.params.league)
	.then(res => res.json())
	.then(
	  (result) => {
		this.setState({
		  teamsArray: result,
		});
		console.log("here");
		console.log(this.state.teamsArray)
	  },
	  (error) => {
		console.log("Error in database call")
	  }
	)
  }

	adminViewSwitch() {
		this.setState({
			isAdminView: !this.state.isAdminView
		});
	}

	render() {
		return (
			<div>
				<h1 className="leagueTitle">{this.props.props.match.params.sport}: {this.props.props.match.params.league}</h1>
				<div> <CreateTeamFormModal leagueId={this.props.props.match.params.id}/> </div>
				{(() => {
					if (this.state.user.is_admin) {
						return (
						<Fragment>
							<div className="adminSwitch">
								<label>Toggle Admin View</label><br/>
								<label class="switch">
								  <input type="checkbox" onClick={this.adminViewSwitch}/>
								  <span class="slider round"></span>
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
						<TeamsTab props={this.props.props} user={this.state.user} teamsArray={this.state.teamsArray}/>
					</TabPanel>
					<TabPanel>
						<GamesTab leagueId={this.props.props.match.params.id} teamsArray={this.state.teamsArray}/>
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