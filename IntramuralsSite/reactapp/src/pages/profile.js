import React from 'react';
import { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MySports from "../components/ProfileMySports";
import "../style/profile.css"



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class ProfilePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: 0,
      teamsArray: [],
      UpcomingGames: [],
      user: props.user,
    }

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (event, newValue) {
    this.setState({
      value:newValue
    })
  };

	componentDidMount() {
        fetch("http://localhost:8000/api/getTeamsByUser/"+this.state.user.id).then(res => res.json()).then(
			(result) => {
				this.setState({
					teamsArray: result
				});
				console.log(this.state.teamsArray)
			},
			(error) => {
				console.log("Error in database call")
			}
		)
	}

  render() {
    const { classes } = this.props;
		return (
      <div class = "title">
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="My Teams" />
            <Tab label="My Games" />
          </Tabs>
          <TabPanel value={this.state.value} index={0}>
            <MySports teamsArray={this.state.teamsArray} user = {this.state.user} ></MySports>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
          insert games tab here
          </TabPanel>
        </Paper>
      </div>
    )
	}
}

export default withStyles(styles, { withTheme:true})(ProfilePage);