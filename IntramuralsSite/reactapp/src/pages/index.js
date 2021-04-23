import React, { Fragment, Component } from "react";
import "../index.css";

class MainPage extends Component {
	constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            teams: {}
        };
    }

    // componentDidMount() {
    // 	fetch('http://localhost:8000/api/getEventsByUser/'+this.state.user.id)
    //     .then(res => res.json())
    //     .then((res) => {
    //     	this.setState({
    //     		teams: res
    //     	});
    //     });
    // }

	render()  {
		return (
			<Fragment>
				<div className="main">
					<h2>SideBar</h2>
					<p>This sidebar is of full height (100%) and always shown.</p>
					<p>Scroll down the page to see the result.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
				</div>
				<div className="sidenav">
					<label>My Stuff</label>
				</div>
			</Fragment>
		);
	}
}

export default MainPage;