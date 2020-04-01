import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
};

export const BannerNav = (props) => {
	return (
		<StyledBannerNav>
			<ul>{React.Children.map(props.children, (c) => <li>{c}</li>)}</ul>
		</StyledBannerNav>
	);
};

const StyledBannerNav = styled.nav`
	height: 100px;
	justify-content: space-between;
	padding: 10px 10px;
	border: 1px solid black;
	& > ul {
		border: 1px solid red;
		height: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0px;
		margin: 0px;
		list-style: none;
	}
`;

BannerNav.propTypes = propTypes;
