import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberToBoard } from '../../actions/addMemberToBoard';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';

export const Modal = () => {
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
			{isShareSuccess.addMemberSuccess && <div>Success! Board member added.</div>}
		</ModalBody>
	);
};
