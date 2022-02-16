import React from "react";
import image from './assets/youtube.png';

import './style.scss';

const App = () => {
	return <div className="container">
		<img src={image} alt="data" />
		Start Project {process.env.NODE_ENV}
		<p className="item">{process.env.name}</p>
	</div>
};

export default App;
