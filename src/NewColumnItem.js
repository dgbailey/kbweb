import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
	itemName: PropTypes.string,
	children: PropTypes.element,
	style: PropTypes.object
};
const defaultProps = {
	itemName: 'Default Item Name',
	style: null
};

export const NewColumnItem = (props) => {
	const { name, style, children } = props;
	return (
		<StyledColumnItem style={style}>
			<h2>{name}</h2>
			{children}
		</StyledColumnItem>
	);
};

const StyledColumnItem = styled.li`
	background: white;
	height: 50px;
	border-radius: 4px;
	width: 100%;
	margin: 3px;
`;

NewColumnItem.propTypes = propTypes;
NewColumnItem.defaultProps = defaultProps;
