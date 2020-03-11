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
	const userMetaData = useSelector((state) => state.userMetaData);
	const { activeBoard: boardId, columns, addBoardStart, items } = boardState;
	const { id: userId } = userMetaData;
	console.log('boardactive', boardId);

	const dispatch = useDispatch();

	useEffect(() => {
		addBoard({ name, userId }, dispatch);
	}, []);

	const grabItemsByColumnId = (colId) => {
		let ids = Object.keys(items.byId).filter((itemKey) => items.byId[itemKey].column_id === colId);
		let itemObjects = ids.map((id) => items.byId[id]);
		return itemObjects;
	};

	return (
		<StyledBoard>
			{/* <h1>{name}</h1> */}
			{addBoardStart ? (
				<section>...Loading</section>
			) : (
				Object.keys(columns.byId).map((k) => {
					const { column_name: name, column_id: colId } = columns.byId[k];
					const itemsByColumnId = grabItemsByColumnId(colId);
					{
						/* not sure what is more performant:grabbing items here or in body component */
					}
					return (
						<NewColumn columnId={colId}>
							<NewColumnHeader name={name} />
							<NewColumnBody items={itemsByColumnId} />
							<ActionButton description={'Add Card'}>
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
			<ActionButton style={abStyles} description={'Add Column'}>
				<ActionInput name={'colName'} relationId={{ boardId }} submitAction={addColumn} />
			</ActionButton>
		</StyledBoard>
	);
}

NewBoard.propTypes = propTypes;

const abStyles = {
	opacity: 0.7,
	'justify-content': 'center',
	'border-radius': '3px',
	width: '200px'
};

const StyledBoard = styled.section`
	height: 800px;
	width: 1000px;
	margin: 100px auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;

	h1 {
		font-size: 20px;
		font-weight: 800;
	}
`;
