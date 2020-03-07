import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActionButton } from './Button';
import { ActionInput } from './ActionInput';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from './actions/addBoard';
import { NewColumn } from './NewColumn';
import { NewColumnHeader } from './NewColumnHeader';

const propTypes = {
	name: PropTypes.string
};

export function NewBoard({ name = 'Get Started' }) {
	const boardState = useSelector((state) => state.expBoard);
	const dispatch = useDispatch();

	useEffect(() => {
		addBoard({ name }, dispatch);
	}, []);

	return (
		<StyledBoard>
			{/* <h1>{name}</h1> */}
			{boardState.addBoardStart ? (
				<section>...Loading</section>
			) : (
				Object.keys(boardState.columns.byId).map((k) => {
					const { column_name: name } = boardState.columns.byId[k];
					return (
						<NewColumn>
							<NewColumnHeader name={name} />
							{/* colbody ul/ */}
							{/* col body contains colitems li */}
						</NewColumn>
					);
				})
			)}
			<ActionButton description={'Custom Name'}>
				<ActionInput />
			</ActionButton>
		</StyledBoard>
	);
}

NewBoard.propTypes = propTypes;

const StyledBoard = styled.section`
	height: 800px;
	width: 1000px;
	margin: 100px auto;
	border: 1px solid black;
	display: flex;
	flex-wrap: wrap;

	justify-content: flex-start;

	h1 {
		font-size: 20px;
		font-weight: 800;
	}
`;
