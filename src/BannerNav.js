import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
};

export const BannerNav = (props) => {
	const {children} = props;
	return (
		<StyledBannerNav>
			{children}
		</StyledBannerNav>
	);
};

const StyledBannerNav = styled.nav`
	
	top: 0px;
	width: 100%;
	height: 70px;
	justify-content: space-between;
	padding: 10px 50px;
	display:flex;
	& > ul {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 0px;
		margin: 0px;
		list-style: none;
	}
`;

BannerNav.propTypes = propTypes;
