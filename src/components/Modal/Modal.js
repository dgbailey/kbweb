import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberToBoard } from '../../actions/addMemberToBoard';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import styled from 'styled-components';

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
					<StyledInput
						placeholder="Type username here"
						autofocus="autofocus"
						onChange={handleChange}
						name="userName"
					/>
				</div>
				<div>
					<StyledButton onClick={dispatchShareAction}>Share</StyledButton>
				</div>
			</ModalHeader>
			{isShareSuccess.addMemberSuccess && <div>Success! Board member added.</div>}
		</ModalBody>
	);
};

const StyledInput = styled.input`
	border: none;
	margin: none;
	madding: none;
	background: transparent;
	&:focus {
		outline: none;
	}
`;

const StyledButton = styled.button`
	display: inline-flex;
	justify-content: center;
	width: 70px;
	height: 30px;
	border-radius: 3px;
	background: lightblue;
	border: none;
	padding: none;
	&:hover {
		cursor: pointer;
	}
	color: white;
	font-weight: bold;
`;
