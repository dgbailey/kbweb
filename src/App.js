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
import { addMemberToBoard } from './actions/addMemberToBoard';
import { useSelector, useDispatch } from 'react-redux';

const Modal = () => {
	let dispatch = useDispatch();
	let activeBoard = useSelector((state) => state.expBoard.activeBoard);
	let isShareSuccess = useSelector((state) => state.addMemberStatus);
	let [ inputData, setInputData ] = useState(null);
	const handleChange = (e) => {
		let data = { [e.target.name]: e.target.value };
		setInputData({ ...data });
	};
	const dispatchShareAction = () => {
		let { userName } = inputData;
		addMemberToBoard(userName, activeBoard, dispatch);
	};
	return (
		<ModalBody>
			<ModalHeader>
				<div>
					<label>username</label>
					<input onChange={handleChange} name="userName" />
				</div>
				<div>
					<button onClick={dispatchShareAction}>Share</button>
				</div>
			</ModalHeader>
			{console.log('k', isShareSuccess)}
			{isShareSuccess.addMemberSuccess && <div>Success! Board member added.</div>}
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
