import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.element,
	colId: PropTypes.string,
	relationId: PropTypes.string
};

export const NewColumn = (props) => {
	const { children, colId, columnId } = props;
	return (
		<StyledNewColumn>
			<div className="column-content">{children}</div>
		</StyledNewColumn>
	);
};

const StyledNewColumn = styled.div`
	width: 250px;
	max-height: 600px;
	border: 1px solid green;
	.column-content {
		background: lightgray;
	}
`;

NewColumn.propTypes = propTypes;
