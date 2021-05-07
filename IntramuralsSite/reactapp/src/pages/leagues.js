import React from "react";
import { Component } from 'react';
import TeamsTab from '../components/LeagueTabs/TeamsTab';
import GamesTab from '../components/LeagueTabs/GamesTab';
import StandingsTab from '../components/LeagueTabs/StandingsTab';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



import axios from "axios";

import "../sports.css"


class LeaguePage extends Component {
	constructor(props) {
    super(props);


    this.state = {
	  user: props.user,
    };

  }

	render() {
		return (
			<div>
				<h1 className="leagueTitle">{this.props.props.match.params.sport}: {this.props.props.match.params.league}</h1>
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