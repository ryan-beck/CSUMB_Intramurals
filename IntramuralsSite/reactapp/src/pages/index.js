import React, { Fragment, Component } from "react";
import { Pressable } from "react-native";
import "../index.css";

import CreatePostFormModal from '../components/Forms/CreatePostFormModal';

class MainPage extends Component {
	constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            events: [],
            posts: [],
            isAdminView: false
        };

       	this.adminViewSwitch = this.adminViewSwitch.bind(this);

    }

    adminViewSwitch() {
		this.setState({
			isAdminView: !this.state.isAdminView
		});
	}

    componentDidMount() {
    	fetch('http://localhost:8000/api/getEventsByUser/'+this.state.user.id)
        .then(res => res.json())
        .then((res) => {
        	this.setState({
        		events: res
        	});
        });
        fetch('http://localhost:8000/api/getPosts/')
        .then(res => res.json())
        .then((res) => {
			this.setState({
				posts: res
			});
        });
    }

	render()  {
		return (
			<Fragment>
				<div className="main">
					<span>
					{(() => {
						if (this.state.user.is_admin) {
							return (
								<Fragment>
									<div className="homeAdminSwitch">
										<label className="homeAdminTitle">Toggle Admin View</label>
										<label className="homeSwitch">
										  <input type="checkbox" onClick={this.adminViewSwitch}/>
										  <span className="homeSlider round"></span>
										</label>
									</div>
									<br/><br/>
								</Fragment>
							)
						}
					})()}
					</span>
					{(() => {
						if (this.state.isAdminView) {
							return (
								<div> <CreatePostFormModal userId={this.state.user.id} post="" create={true}/> </div>
							);
						}
					})()}
					{(() => {
						if (this.state.posts.length == 0) {
							return (
								<div className="no-posts"> 
									<label>
										There are currently no posts to display.
									</label>
								</div>
							);
						}
					})()}
					{this.state.posts.reverse().map((post, index) => (
						<div key={index}>
							{(() => {
								if (this.state.isAdminView && post.owner==this.state.user.id) {
									return (
										<div> <CreatePostFormModal userId={this.state.user.id} post={post} create={false}/> </div>
									);
								}
							})()}
							<span>
								<label className="post-title">{post.display_name}</label>
								<label className="post-date">{post.posted_date}</label>
							</span>

							{(() => {
								if (post.text) {
									return (
										<div>
											<label className="post-text">{post.text}</label>
										</div>
									);
								}
							})()}
							{(() => {
								if (post.media_url) {
									return (
										<div>
											<img className="post-media" src={post.media_url} alt="PostedMedia"/>
										</div>
									);
								}
							})()}
							<hr/>
						</div>
					))}
				</div>
				<div className="sidenav">
					<div className="sidenav-title">
					<label >Upcoming Games</label></div>
					{(() => {
						if (this.state.events.length == 0) {
							return (
								<div className="no-posts"> 
									<label>
										You do not have any upcoming games.
									</label>
								</div>
							);
						}
					})()}
					{this.state.events.map((event, index) => (
						<div key={index}>
							<label className="sidenav-game">{event.gameTitle}</label>
								<div className="sidenav-date">{event.gameTime}</div>
						</div>
					))}
				</div>
			</Fragment>
		);
	}
}

export default MainPage;