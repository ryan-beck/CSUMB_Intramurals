import React from "react";
import axios from 'axios';


function handleSubmit(event) {
	const text = document.querySelector('#char-input').value
  
	axios
	  .get(`http://localhost:8000/char_count?text=${text}`).then(({data}) => {
		console.log(`${data.count}`)
	  })
	  .catch(err => console.log(err))
  }


const MainPage = () => {
	// return (
	// 	<div>
	// 		<h3>welcome to main</h3>
	// 		<small>feed will be here soon</small>
	// 	</div>
	// );
	return (
		<div className="App">
		<div>
			<label htmlFor='char-input'>How many characters does</label>
			<input id='char-input' type='text' />
			<button onClick={handleSubmit}>have?</button>
		</div>
	
		</div>
	);
}

export default MainPage;