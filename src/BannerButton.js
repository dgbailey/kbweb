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
export const BannerButton = ({ name, styles }) => {
	return <StyledButton style={styles}>{name}</StyledButton>;
};
BannerButton.propTypes = propTypes;
BannerButton.defaultProps = defaultProps;

const StyledButton = styled.button`
	display: inline-flex;
	border-radius: 2px;
	border: none;
	padding: 5px;
	&:hover {
		cursor: pointer;
		background: lightgray;
	}
`;
