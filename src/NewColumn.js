import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.element
};

export const NewColumn = (props) => {
	const { children } = props;
	return <StyledNewColumn>{children}</StyledNewColumn>;
};

const StyledNewColumn = styled.div`

	width: 250px;
	max-height: 600px;
	height: 100px;
	overflow-y: scroll;
	border: 1px solid green;
`;

NewColumn.propTypes = propTypes;
