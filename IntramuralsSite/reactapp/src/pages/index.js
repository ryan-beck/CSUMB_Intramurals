import React, { Fragment, Component } from "react";
import "../index.css";

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
					{this.state.posts.map((post, index) => (
						<div key={index} className="post">
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