import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
	name: PropTypes.string,
	styles: PropTypes.object
};

const defaultProps = {
	name: 'default',
	styles: {}
};
export const BannerButton = (props) => {
	return (
		<StyledButton onClick={props.onClick} style={props.styles}>
			{props.name}
		</StyledButton>
	);
};
BannerButton.propTypes = propTypes;
BannerButton.defaultProps = defaultProps;

const StyledButton = styled.button`
	display: inline-flex;
	border-radius: 2px;
	border: none;
	padding: 5px;
	font-family: 'Roboto', sans-serif;
	font-size: 15px;
	font-weight: 400;
	background: transparent;
	&:hover {
		cursor: pointer;
		background: lightgray;
	}
	&:focus {
		outline: none;
	}
`;
