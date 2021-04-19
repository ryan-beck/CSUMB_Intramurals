import React, { Fragment, Component } from "react";
import "../index.css";

// const posts = {
// 	"postId": [1,2,3,4,5],
// 	"mediaUrl": ["","","www","www",""],
// 	"postText": as,
// 	"userId": as,
// 	"datePosted": as
// };


// Int: PostID
// String: Media URL
// String: Text
// Int: UserID
// Date: Date Posted


class MainPage extends Component {

	render()  {
		return (
			<Fragment>
				<div class="main">
					<h2>Sidebar</h2>
					<p>This sidebar is of full height (100%) and always shown.</p>
					<p>Scroll down the page to see the result.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
					<p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
				</div>
				<div class="sidenav">
					<label class="sidenav-text">my stuff</label>
				</div>
			</Fragment>
		);
	}
}

export default MainPage;