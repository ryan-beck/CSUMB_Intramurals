import React, { Component } from 'react';
import axios from "axios"; 
import { storage } from '../../firebase';

import '../../style/sportForm.css'
import '../../style/modal.css';

class CreateSportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sportName: "",
            image: null,
            logoUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.HuOqn7QL9Gw7vHAzolIJzgHaHa%26pid%3DApi&f=1"
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.postToDjango = this.postToDjango.bind(this);
    }

    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    handleImageChange(event) {
        if(event.target.files[0]) {
            this.setState({
                image: event.target.files[0]
            });
        }
    }

    postToDjango() {
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
            this.props.handleFormSubmit(sportData);
        });
    }

    submitHandler(event) {
        event.preventDefault();

        if(this.state.image) {
            var uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref("images")
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            logoUrl: url
                        });
                        this.postToDjango();
                    })
                }
            );
        } else {
            this.postToDjango();
        }
    }

    render () {
        return (
            <div class="sportForm">
                <h2 className="modalText">Add a New Sport</h2>
                <form onSubmit={this.submitHandler}>
                    <label className="modalText">Sport Name</label> <br/>
                    <input type="text" name="sportName" value={this.state.sportName} onChange={this.onChangeHandler}/> <br/><br/>
                    <label className="modalText">Would you like to add a sport logo?</label> <br/>
                    <input type="file" name="image" accept="image/*" onChange={this.handleImageChange} className="modalText"/> <br/>
                    <input className="submitHandler right" type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateSportForm;