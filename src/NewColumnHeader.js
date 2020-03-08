import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
	name: PropTypes.string,
	children: PropTypes.element
};

export const NewColumnHeader = (props) => {
	const { name, children } = props;

	return (
		<StyledColumnHEader>
			<h2>{name}</h2>
			{children}
		</StyledColumnHEader>
	);
};

const StyledColumnHEader = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	padding: 5px;
	h2 {
		font-weight: bold;
	}
`;

NewColumnHeader.propTypes = propTypes;
