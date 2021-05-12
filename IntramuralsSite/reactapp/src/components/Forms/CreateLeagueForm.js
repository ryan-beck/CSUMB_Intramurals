import React, { Component } from 'react';
import axios from "axios"; 
import '../../style/modal.css'; 

class CreateSportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // TODO: pass id of selected sport as prop
            sportId: this.props.sportId,
            sportName: this.props.sportName,
            leagueName: "",
            startDate: "",
            endDate: "",
            startRegDate: "",
            endRegDate: "",
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

        today = yyyy+'-'+mm+'-'+dd;
        document.getElementById("regStartDate").setAttribute("min", today);
    }


    onChangeHandler(event) {
        var regStart = (document.getElementById("regStartDate").value);
        document.getElementById("regEndDate").setAttribute("min", regStart);
        
        var regEnd = (document.getElementById("regEndDate").value);
        document.getElementById("leagueStartDate").setAttribute("min", regEnd);

        var leagueStart = (document.getElementById("leagueStartDate").value);
        document.getElementById("leagueEndDate").setAttribute("min", leagueStart);

        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    submitHandler(event) {
        event.preventDefault();
        // TODO: implement form validation
        let leagueData = {
            sport: this.state.sportId,
            league_name: this.state.leagueName,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            reg_start_date: this.state.startRegDate,
            reg_end_date: this.state.endRegDate
        };
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createLeague/', 
            data: leagueData
        })
        .then(({data}) => {
            console.log(data);
            this.props.handleFormSubmit(leagueData);
        });
    }
    

    render () {
        return (
            <div>
                <h2 className="modalText">Create League for {this.state.sportName}</h2>
                <form onSubmit={this.submitHandler}>

                    <div>
                        <div className="row">
                            <div className="center">
                                <label className="modalText">League Name</label> <br/>
                                <input type="text" placeholder="ex: 'Fall 2021: 3v3'" name="leagueName" value={this.state.leagueName} onChange={this.onChangeHandler} required/> <br/>
                            </div>
                        </div> <br/>
                    

                        <div class="row">
                            <div className="form-group left">
                                <label className="modalText">Registration Start Date </label> <br/>
                                <input id="regStartDate" type="date" name="startRegDate" value={this.state.startRegDate} onChange={this.onChangeHandler} required/> 
                            </div>
                            <div className="form-group right">
                                <label className="modalText">Registration End Date </label> <br/>
                                <input id="regEndDate" type="date" name="endRegDate" value={this.state.endRegDate} onChange={this.onChangeHandler} required/>
                            </div>
                        </div>

                        <div class="row">
                            <div className="form-group left">
                                <label className="modalText">League Start Date </label> <br/>
                                <input id="leagueStartDate" type="date" name="startDate" value={this.state.startDate} onChange={this.onChangeHandler} required/>
                            </div>
                            <div className="form-group right">
                                <label className="modalText">League End Date </label> <br/>
                                <input id="leagueEndDate" type="date" name="endDate" value={this.state.endDate} onChange={this.onChangeHandler} required/>
                            </div>
                        </div>
                    </div>

                    <input className="submitHandler right" type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateSportForm;