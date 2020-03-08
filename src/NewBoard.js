import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActionButton } from './Button';
import { ActionInput } from './ActionInput';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from './actions/addBoard';
import { NewColumn } from './NewColumn';
import { NewColumnHeader } from './NewColumnHeader';
import { NewColumnBody } from './NewColumnBody';
import { addColumn } from './actions/addColumn';
import { addItem } from './actions/addItem';

const propTypes = {
	name: PropTypes.string
};

export function NewBoard({ name = 'Get Started' }) {
	const boardState = useSelector((state) => state.expBoard);
	const { activeBoard: boardId, columns, addBoardStart, items } = boardState;
	console.log('boardactive', boardId);

	const dispatch = useDispatch();

	useEffect(() => {
		addBoard({ name }, dispatch);
	}, []);

	return (
		<StyledBoard>
			{/* <h1>{name}</h1> */}
			{addBoardStart ? (
				<section>...Loading</section>
			) : (
				Object.keys(columns.byId).map((k) => {
					const { column_name: name, column_id: colId } = columns.byId[k];
					return (
						<NewColumn columnId={colId}>
							<NewColumnHeader name={name} />
							<NewColumnBody items={items} />
							{/* we need to filter body items by col id */}
							<ActionButton style={abStyles} description={'Add Card'}>
								<ActionInput
									name={'itemContent'}
									relationId={{ colId, boardId }}
									submitAction={addItem}
								/>
							</ActionButton>
						</NewColumn>
					);
				})
			)}
			<ActionButton description={'Add Column'}>
				<ActionInput name={'colName'} relationId={{ boardId }} submitAction={addColumn} />
			</ActionButton>
		</StyledBoard>
	);
}

NewBoard.propTypes = propTypes;

const abStyles = { opacity: '1', 'justify-content': 'center', width: '100%', 'border-radius': '0px' };
const aiStyles = {};
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
