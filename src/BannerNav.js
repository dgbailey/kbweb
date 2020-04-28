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
	position: fixed;
	top: 0px;
	width: 100%;
	height: 70px;
	justify-content: space-between;
	padding: 10px 50px;
	& > ul {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px;
		margin: 0px;
		list-style: none;
	}
`;

BannerNav.propTypes = propTypes;
