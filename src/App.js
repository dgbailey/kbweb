import React from 'react';
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
									return <BannerButton onClick={() => value.toggleModal(ModalBody)} name={'Share'} />;
								}}
							</ModalConsumer>
						</BannerNav>
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
		</ModalProvider>
	);
}

export default App;
