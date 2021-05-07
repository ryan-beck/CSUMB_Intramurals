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
		isAdminView: false
    };

    this.adminViewSwitch = this.adminViewSwitch.bind(this);

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
				
					<TabPanel>
						<TeamsTab props={this.props.props} user={this.state.user}/>
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