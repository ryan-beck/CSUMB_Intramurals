import React, { Component } from 'react';
import axios from "axios"; 
import { storage } from '../firebase';

class CreatePostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            owner: props.userId,
            postText: "",
            image: null,
            mediaUrl: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postToDjango = this.postToDjango.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    handleChange(event) {
        if(event.target.files[0]) {
            this.setState({
                image: event.target.files[0]
            });
        }
    }

    postToDjango() {
        // get current date and time in correct format
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var today = date+' '+time;


        console.log(this.state.mediaUrl);
        // add post to django database
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createPost/', 
            data: {
              text: this.state.postText,
              media_url: this.state.mediaUrl,
              owner: this.state.owner,
              posted_date: today
            }
        })
        .then(({data}) => {
            console.log(data);
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
                            mediaUrl: url
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
            <div>
                <h2>Add A New Post</h2>
                <form onSubmit={this.submitHandler}>
                    <label>Caption</label> <br/>
                    <textarea name="postText" rows="5" cols="50" value={this.state.postText} onChange={this.onChangeHandler}/> <br/>
                    <input type="file" name="myfile" accept="image/*" onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreatePostForm;