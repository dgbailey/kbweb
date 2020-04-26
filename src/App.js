import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Registration } from './Registration';
import { BannerNav } from './BannerNav';
import { BannerButton } from './BannerButton';
import { NewBoard } from './NewBoard';
import { ModalRoot } from './ModalRoot';
import { ModalProvider } from './modalProvider';
import { ModalBody } from './ModalBody';
import { ModalConsumer } from './ModalRoot';
import { ModalHeader } from './ModalHeader';

const Modal = () => {
	let [ userName, setUsername ] = useState(null);
	const handleChange = (e) => {
		let data = { [e.target.name]: e.target.value };
		setUsername({ ...data });
	};
	return (
		<ModalBody>
			<ModalHeader>
				<div>
					<label>username</label>
					<input onChange={handleChange} name="userName" />
				</div>
				<h2>
					<button>Share</button>
				</h2>
			</ModalHeader>
		</ModalBody>
	);
};

function App() {
	return (
		<ModalProvider>
			<div className="App">
				<Switch>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/board/experimental">
						<NewBoard />
					</Route>
					<Route path="/board/:id">
						<ModalRoot />
						<BannerNav>
							<BannerButton name={'Home'} />
							<ModalConsumer>
								{(value) => {
									return <BannerButton onClick={() => value.toggleModal(Modal)} name={'Share'} />;
								}}
							</ModalConsumer>
						</BannerNav>
						<ModalConsumer>
							{(value) => {
								return <NewBoard onClick={() => value.toggleModal(ModalBody)} onMountNewUser={false} />;
							}}
						</ModalConsumer>
					</Route>

					<Route path="/signup">
						<Registration />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</div>
		</ModalProvider>
	);
}

export default App;
