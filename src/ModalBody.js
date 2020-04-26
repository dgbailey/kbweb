import styled from 'styled-components';
import React from 'react';

export const ModalBody = (props) => {
	const { children } = props;
	return <StyledModal>{children}</StyledModal>;
};

const StyledModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid lightgray;
	border-radius: 2px;
	background: white;
	position: absolute;
	height: 350px;
	width: 400px;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;
	z-index: 1000;
`;
