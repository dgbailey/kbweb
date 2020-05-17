import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { Registration } from './Registration';
import { BannerNav } from './BannerNav';
import { BannerButton } from './BannerButton';
import { NewBoard } from './NewBoard';
import { Modal } from './components/Modal/Modal';
import { ModalRoot } from './components/Modal/ModalRoot';
import { ModalConsumer } from './components/Modal/ModalRoot';
import { ModalProvider } from './components/Modal/modalProvider';
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
									return <BannerButton data={'banner-btn-share'} onClick={() => value.toggleModal(Modal)} name={'Share'} />;
								}}
							</ModalConsumer>
						</BannerNav>
						<ModalConsumer>
							{(value) => {
								return (
									<NewBoard
										onClick={() => {
											value.data.isOpen && value.toggleModal(Modal);
										}}
										onMountNewUser={false}
									/>
								);
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
