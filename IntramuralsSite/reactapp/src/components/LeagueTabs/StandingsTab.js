import React from "react";
import { Component } from 'react';

import "../../style/standingstab.css"


class StandingsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamsArray: props.teamsArray,
        };
    }

    render() {
        return (
            <div>
                {(() => {
                    if (this.state.teamsArray.length == 0) {
                        return (
                            <div className="no-standing">
                                <label>
                                    There is no league data to display.
                                </label>
                            </div>
                        );
                    }
                })()}
                <table className="tableFormat">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Team Name</th>
                    <th>W</th>
                    <th>L</th>
                    <th>T</th>
                    <th>WPT</th>
                  </tr>
                </thead>
                <tbody>
                
                  {this.state.teamsArray.map((team, index) => (
                    <tr key={index}>
                            <td>{index+1}</td>
                            <td>{team.team_name}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.ties}</td>
                            <td>{team.wpt}</td>
                    </tr>
                        
                    ))}
                  </tbody>
                </table>
            </div>
        )
    }
}

export default StandingsTab;