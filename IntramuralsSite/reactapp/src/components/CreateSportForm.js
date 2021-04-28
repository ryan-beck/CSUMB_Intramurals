import React, { Component } from 'react';
import axios from "axios"; 

import '../style/sportForm.css'

class CreateSportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sportName: "",
            logoUrl: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    submitHandler(event) {
        event.preventDefault();
        let sportData = {
            sport_name: this.state.sportName,
            logo_url: this.state.logoUrl,
            is_active: true
          }
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createSport/', 
            data: sportData
        })
        .then(({data}) => {
            console.log(data);
            this.props.handleFormSubmit(sportData);
        });
    }
    

    render () {
        return (
            <div class="sportForm">
                <h2>Create a new sport</h2>
                <form onSubmit={this.submitHandler}>
                    <label>Sport Name</label> <br/>
                    <input type="text" name="sportName" value={this.state.sportName} onChange={this.onChangeHandler}/> <br/>
                    <label>Photo Url</label> <br/>
                    <input type="text" name="logoUrl" value={this.state.logoUrl} onChange={this.onChangeHandler}/> <br/>
                    Dont have a url for the photo? Try uploading an image to <a href="https://imgur.com/upload">Imgur</a> to create a url. <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateSportForm;