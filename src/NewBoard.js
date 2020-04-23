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

export function NewBoard({ name = 'Get Started' }) {
	const boardState = useSelector((state) => state.expBoard);
	const {
		activeBoard: boardId,
		entities,
		addBoardStart,
		fetchBoardSuccess,
		fetchColumnSuccess,
		fetchItemSuccess
	} = boardState;
	const { columnBoard: columnBoardEntity, itemColumn: itemColumnEntity } = entities;

	const userMetaData = useSelector((state) => state.userMetaData);
	const { id: userId } = userMetaData;
	const history = useHistory();
	const dispatch = useDispatch();

	//TODO:Another effect here for subscribing to board specific web socket
	//TODO:Think of best way to manage web sockets.
	/*Perhaps they exist completely in the store. Mounting merely dispatches an event to create.
		Other components can then dispatch websocket specific events
		Middleware:
		
	*/
	useEffect(() => {
		let webSocket = new WebSocket('ws://localhost:8080/ws/' + boardId);
		webSocket.onmessage = function(e) {
			alert(e);
		};
		return () => webSocket.close();
	}, []);

	useEffect(() => {
		let formattedUuid = parseUriIntoFormattedUuid(history.location.pathname);

		parallelRequests(
			fetchBoardByBoardId(formattedUuid, dispatch),
			fetchColumnsByBoardId(formattedUuid, dispatch),
			fetchItemsByBoardId(formattedUuid, dispatch)
		);
	}, []);

	const grabItemDataByColId = (colId) => {
		let itemObjects = itemColumnEntity.byId;
		let itemIds = Object.keys(itemObjects).filter((itemKey) => itemObjects[itemKey].column_id === colId);
		return itemIds;
	};
	const grabColumnDataByBoardId = (boardId) => {
		let colObjects = columnBoardEntity.byId;
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
			<StyledBoard>
				{hydratedSubComponents}
				<ActionButton style={abStyles} description={'Add Column'}>
					<ActionInput name={'colName'} relationId={{ boardId }} submitAction={addColumn} />
				</ActionButton>
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
