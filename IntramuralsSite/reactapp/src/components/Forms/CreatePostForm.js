import React, { Component } from 'react';
import axios from "axios"; 
import { storage } from '../../firebase';
import '../../style/modal.css'; 

class CreatePostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            owner: props.userId,
            post: props.post,
            isCreating: props.create,
            postText: "",
            image: null,
            mediaUrl: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postToDjango = this.postToDjango.bind(this);
        this.editPostDjango = this.editPostDjango.bind(this);
        this.createHandler = this.createHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
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
            window.location.reload();
        });
    }

    editPostDjango(newText) {
        var today = new Date(this.state.post.posted_date),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var today = date+' '+time;

        axios({
            method:'put', 
            url: 'http://localhost:8000/api/editPost/'+ (this.state.post.id).toString()+'/', 
            data: {
              text: newText,
              media_url: this.state.mediaUrl,
              owner: this.state.owner,
              posted_date: today
            }
        })
        .then(({data}) => {
            console.log(data);
            window.location.reload();
        });
    }

    createHandler(event) {
        event.preventDefault();

        if(document.CreatePostForm.postText.value.trim() == "" && document.CreatePostForm.postImage.value.trim() == ""){
            alert( "At least one field is required" );
            document.CreatePostForm.postText.focus();
        } else if(this.state.image) {
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

    editHandler(event) {
        event.preventDefault();
        var newText = this.state.post.text;
        if(document.EditPostForm.editText.value != this.state.post.text) {
            newText = document.EditPostForm.editText.value;
        }

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
                        this.editPostDjango(newText);
                    })
                }
            );
        } 
        else {
            if(this.state.post.media_url) {
                this.state.mediaUrl = this.state.post.media_url;
            }
            this.editPostDjango(newText);
        }
        
    }

    deleteHandler(event) {
        axios({
            method:'delete', 
            url: 'http://localhost:8000/api/deletePost/'+this.state.post.id,
        })
        .then(({data}) => {
            console.log(data);
            window.location.reload();
        });
    }
    

    render () {    
        return (
            <div>
            {(() => {
                if (this.state.isCreating) {
                    return (
                        <div> 
                            <h2 className="modalText">Add A New Post</h2>
                            <form name="CreatePostForm" onSubmit={this.createHandler}>
                                <label className="modalText">Caption:</label> <br/>
                                <textarea name="postText" rows="5" cols="50" value={this.state.postText} onChange={this.onChangeHandler} placeholder="What would you like to say?"/> <br/><br/>
                                <input type="file" name="postImage" id="actual-btn" accept="image/*" onChange={this.handleChange} className="modalText"/>
                                <input className="submitHandler" type="submit" value="Submit"/>
                            </form>
                        </div>
                    );
                } else {
                    return(
                        <div>
                            <h2 className="modalText">Edit Your Post</h2>
                            <form name="EditPostForm" onSubmit={this.editHandler}>
                                <label className="modalText">Caption:</label> <br/>
                                <textarea name="editText" rows="5" cols="50" defaultValue={this.state.post.text} onChange={this.onChangeHandler} placeholder="What would you like to say?"/> <br/><br/>
                                <input type="file" name="editImage" id="actual-btn" accept="image/*" onChange={this.handleChange} className="modalText"/>

                                <input name="deleteButton" className="deleteHandler" type="button" value="Delete" onClick={this.deleteHandler}/>
                                <input name="submitButton" className="submitHandler" type="submit" value="Submit"/>
                            </form>
                        </div>
                    );
                }
            })()}
            </div>
            
        )
    }
}

export default CreatePostForm;