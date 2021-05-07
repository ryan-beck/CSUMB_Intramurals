import React from "react";
import { Component } from 'react';


class GamesTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games : {}
        };



    }


    componentDidMount() {
        // axios({
        //     method:'get', 
        //     url: 'http://localhost:8000/api/getEventsByLeague/', 
        //     data: {leagueId:}
        // })
        // .then(({data}) => {
        //     console.log(data);
        // });
    }


    render() {
        return (
            <div>
                <h1>Games Here</h1>
            </div>
        )
    }
}

export default GamesTab;