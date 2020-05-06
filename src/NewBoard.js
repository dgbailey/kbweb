import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActionButton } from './Button';
import { ActionInput } from './ActionInput';
import { useSelector, useDispatch } from 'react-redux';
import { NewColumn } from './NewColumn';
import { NewColumnHeader } from './NewColumnHeader';
import { NewColumnBody } from './NewColumnBody';
import { addColumn } from './actions/addColumn';
import { addItem } from './actions/addItem';
import { parseUriIntoFormattedUuid } from './utilities/parseUriIntoFormattedUuid';
import { useHistory } from 'react-router-dom';
import { parallelRequests } from './utilities/http/parallelRequests';
import { fetchBoardByBoardId } from './actions/fetchBoardByBoardId';
import { fetchColumnsByBoardId } from './actions/fetchColumnsByBoardId';
import { fetchItemsByBoardId } from './actions/fetchItemsByBoardId';

const propTypes = {
	name: PropTypes.string,
	onMountNewUser: PropTypes.bool
};

export function NewBoard(props) {
	const boardState = useSelector((state) => state.expBoard);
	const { activeBoard: boardId, entities, fetchBoardSuccess, fetchColumnSuccess, fetchItemSuccess } = boardState;
	const { columns, itemColumn: itemColumnEntity } = entities;
	const history = useHistory();
	const dispatch = useDispatch();
	const rawBoardUri = history.location.pathname;

	useEffect(
		() => {
			dispatch({ type: 'SOCKET_CONN_MOUNT', payload: { entityId: boardId } });
			return () => dispatch({ type: 'SOCKET_CONN_UNMOUNT' });
			//boardId initially renders null which is not convenient for establishing a websocket connection with active entity
		},
		[ dispatch, boardId ]
	);

	useEffect(
		() => {
			let formattedUuid = parseUriIntoFormattedUuid(rawBoardUri);

			parallelRequests(
				fetchBoardByBoardId(formattedUuid, dispatch),
				fetchColumnsByBoardId(formattedUuid, dispatch),
				fetchItemsByBoardId(formattedUuid, dispatch)
			);
		},
		[ dispatch, rawBoardUri ]
	);

	const grabItemDataByColId = (colId) => {
		let itemObjects = itemColumnEntity.byId;
		let itemIds = Object.keys(itemObjects).filter((itemKey) => itemObjects[itemKey].column_id === colId);
		return itemIds;
	};
	const grabColumnDataByBoardId = (boardId) => {
		let colObjects = columns.byId;
		let columnIds = Object.keys(colObjects).filter((colKey) => colObjects[colKey].board_id === boardId);

		return columnIds.map((id) => colObjects[id]);
	};

	const hydrateColumnsAndItemsFromStore = (boardId) => {
		return grabColumnDataByBoardId(boardId).map((column) => {
			let { column_id: colId, column_name: name } = column;
			let itemIdsByColId = grabItemDataByColId(colId);

			return (
				<NewColumn columnId={colId}>
					<NewColumnHeader name={name} />
					<NewColumnBody items={itemIdsByColId} />
					<ActionButton description={'Add Card'}>
						<ActionInput name={'itemContent'} relationId={{ colId, boardId }} submitAction={addItem} />
					</ActionButton>
				</NewColumn>
			);
		});
	};

	const hydrateBoard = (hydratedSubComponents) => {
		return (
		
			<StyledBoard onClick={props.onClick}>
				<div className='section-scroller'>
				{hydratedSubComponents}
				<ActionButton style={abStyles} description={'Add Column'}>
					<ActionInput name={'colName'} relationId={{ boardId }} submitAction={addColumn} />
				</ActionButton>
				</div>
			</StyledBoard>
		
		);
	};
	const conditionallyRenderBoard = (renderResult) => {
		const isFetchCompleteSuccess = fetchBoardSuccess && fetchItemSuccess && fetchColumnSuccess;
		switch (isFetchCompleteSuccess) {
			case true:
				return renderResult;

			default:
				return <div>...Loading</div>;
		}
	};
	return conditionallyRenderBoard(hydrateBoard(hydrateColumnsAndItemsFromStore(boardId)));
}

NewBoard.propTypes = propTypes;

const abStyles = {
	opacity: 0.7,
	justifyContent: 'center',
	bordeRadius: '3px',
	width: '200px'
};

const StyledBoard = styled.section`
	
	
	display: flex;
	
	.section-scroller{
		display:flex;
		flex-wrap: no-wrap;
		justify-content: flex-start;
		max-width: 1200px;
		height:900px;
		overflow-x:scroll;
		${'' /* overflow-y:hidden; */}
	}

	& > h1 {
		font-size: 20px;
		font-weight: 800;
	}
`;
