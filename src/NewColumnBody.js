import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
	items: PropTypes.object
};

export const NewColumnBody = (props) => {
	const { items } = props;
	const { byId } = items;

	return <StyledNewColumnBody>{Object.keys(byId).map((k) => <li>{byId[k].item_content}</li>)}</StyledNewColumnBody>;
};

const StyledNewColumnBody = styled.ul`
	padding: 0px;
	list-style: none;
	max-height: 600px;
	overflow-y: scroll;
	border: 1px solid blue;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

NewColumnBody.propTypes = propTypes;
