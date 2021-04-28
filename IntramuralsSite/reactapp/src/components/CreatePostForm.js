import React, { Component } from 'react';
import axios from "axios"; 

class CreatePostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            owner: props.userId,
            postText: ""
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
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var today = date+' '+time;
        
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createPost/', 
            data: {
              text: this.state.postText,
              media_url: "",
              owner: this.state.owner,
              posted_date: today
            }
        })
        .then(({data}) => {
            console.log(data);
        });
        
    }
    

    render () {
        return (
            <div>
                <h2>Add A New Post</h2>
                <form onSubmit={this.submitHandler}>
                    <label>Caption</label> <br/>
                    <textarea name="postText" rows="5" cols="50" value={this.state.postText} onChange={this.onChangeHandler}/> <br/>
                    <input type="file" name="myfile" accept="image/*"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreatePostForm;