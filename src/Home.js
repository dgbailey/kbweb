import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Board } from './Board';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Preview } from './Preview';
import { formatBoardUuid } from './utilities/formatBoardUuid';

export const Home = () => {
	const pathPrefix = '/home/';
	const boardMetaData = useSelector((state) => state.userMetaData.boardIds);

	const boardURIprefix = '/board/';

	return (
		// home catalogue
		// displays links to user boards

		<StyledHome>
			{boardMetaData.map((b) => (
				<Preview
					to={boardURIprefix + b.name + '-' + formatBoardUuid(b.board_id)}
					key={b.board_id}
					id={b.board_id}
					name={b.name}
				/>
			))}
		</StyledHome>
	);
};

const StyledHome = styled.section`
	height: 100%;
	width: 100%;
	border: 1px solid red;
	display: flex;
	flex-wrap: wrap;
`;
