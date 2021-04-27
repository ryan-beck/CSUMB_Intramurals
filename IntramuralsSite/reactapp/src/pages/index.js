import React, { Fragment, Component } from "react";
import { Pressable } from "react-native";
import "../index.css";

import add from '../assets/add.png';
import edit from '../assets/pencil.png';
import remove from '../assets/delete.png';
import CreateLeagueFormModal from '../components/CreateLeagueFormModal';

class MainPage extends Component {
	constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            events: [],
            posts: []
        };
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
					{(() => {
						if (this.state.user.is_admin) {
							return (
								<span>
									<img className="adminIcons" src={add}></img>
								</span>
							);
						}
					})()}
					{this.state.posts.map((post, index) => (
						<div key={index} className="post">
							<span>
								<label className="post-title">{post.display_name}</label>
								<label className="post-date">{post.posted_date}</label>
							</span>
							{(() => {
								if (this.state.user.is_admin) {
									return (
										<div className="editIcons">
											<img className="adminIcons" src={edit}></img>
											<img className="adminIcons" src={remove}></img>
										</div>
									);
								}
							})()}
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
					<label className="sidenav-title">Upcoming Games</label>
					{this.state.events.map((event, index) => (
						<div key={index}>
							<label>{event.gameTitle}</label>
							<ul>
								<li><span>{event.gameTime}</span></li>
							</ul>
						</div>
					))}
				</div>
			</Fragment>
		);
	}
}

export default MainPage;