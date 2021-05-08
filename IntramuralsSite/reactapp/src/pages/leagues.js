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
		leagueArray: [],
		teamsArray: [],
		playerArray: [],
		isAdminView: false,
		sportIsActive: null
    };

    this.adminViewSwitch = this.adminViewSwitch.bind(this);

  }

  	componentDidMount() {
  		fetch('http://localhost:8000/api/getSportById/'+this.props.props.match.params.sportId)
        .then(res => res.json())
        .then((res) => {
            this.setState({
				sportIsActive: res.is_active
			});
        });
  	}

	adminViewSwitch() {
		this.setState({
			isAdminView: !this.state.isAdminView
		});
	}

	render() {
		return (
			<div className="paddingLeague">
				{(() => {
					if (this.state.sportIsActive) {
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
				
					<TabPanel>
						{ this.state.sportIsActive != null ? <TeamsTab props={this.props.props} user={this.state.user} sportIsActive={this.state.sportIsActive}/> : null }
						
					</TabPanel>
					<TabPanel>
						<GamesTab/>
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