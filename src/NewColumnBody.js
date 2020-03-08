import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NewColumnItem } from './NewColumnItem';

const propTypes = {
	items: PropTypes.array
};

export const NewColumnBody = (props) => {
	const { items } = props;
	console.log(items);
	return <StyledNewColumnBody>{items.map((k) => <NewColumnItem name={k.item_content} />)}</StyledNewColumnBody>;
};

const StyledNewColumnBody = styled.ul`
	list-style: none;
	max-height: 600px;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 5px;
`;

NewColumnBody.propTypes = propTypes;
