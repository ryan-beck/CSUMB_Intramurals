import React from 'react';
import { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CurrentProfile from "../components/ProfileTabs/CurrentProfile";
import PastProfile from "../components/ProfileTabs/PastProfile";
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
      outcomes: {},
    }

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentWillMount() {
    fetch("http://localhost:8000/api/getWinLossByUser/"+this.state.user.id).then(res => res.json()).then(
      (result) => {
        this.setState({
          outcomes: result
        });
        console.log(this.state.outcomes)
      },
      (error) => {
        console.log("Error in database call")
      }
    )
  }

  handleTabChange (event, newValue) {
    this.setState({
      value:newValue
    })
  };

	

  render() {
    const { classes } = this.props;
		return (
      <div class = "title">
        <div>
          <h1>{this.state.user.display_name}</h1>
          <h6><i>Overall Record: {this.state.outcomes.wins} - {this.state.outcomes.losses} - {this.state.outcomes.ties}</i></h6>
        </div>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Current Teams" />
            <Tab label="Past Teams" />
          </Tabs>
          <TabPanel value={this.state.value} index={0}>
            <CurrentProfile  user = {this.state.user} ></CurrentProfile>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
          <PastProfile user = {this.state.user} ></PastProfile>
          </TabPanel>
        </Paper>
      </div>
    )
	}
}

export default withStyles(styles, { withTheme:true})(ProfilePage);