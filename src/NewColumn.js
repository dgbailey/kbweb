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
	min-width: 270px;
	max-height: 600px;
	margin: 0px 5px;

	.column-content {
		background: #e8e7e7;
		border-radius: 5px;
		padding: 0px 3px;
	}
`;

NewColumn.propTypes = propTypes;
