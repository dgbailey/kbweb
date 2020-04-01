import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Registration } from './Registration';

import { NewBoard } from './NewBoard';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/home">
					<Home />
				</Route>
				<Route path="/board/experimental">
					<NewBoard />
				</Route>
				<Route path="/board/:id">
					<NewBoard onMountNewUser={false} />
				</Route>

				<Route path="/signup">
					<Registration />
				</Route>
				<Route path="/">
					<Login />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
