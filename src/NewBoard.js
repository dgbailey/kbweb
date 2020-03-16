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
	const { boardState } = useSelector((state) => state.expBoard);
	const {
		activeBoard: boardId,
		entities,
		addBoardStart,
		fetchBoardSuccess,
		fetchColumnSuccess,
		fetchItemSuccess
	} = boardState;
	const {
		columns: columnsEntity,
		items: itemsEntity,
		columnBoard: columnBoardEntity,
		itemColumn: itemColumnEntity
	} = entities;

	const userMetaData = useSelector((state) => state.userMetaData);
	const { id: userId } = userMetaData;
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		let formattedUuid = parseUriIntoFormattedUuid(history.location.pathname);

		parallelRequests(
			fetchBoardByBoardId(formattedUuid, dispatch),
			fetchColumnsByBoardId(formattedUuid, dispatch),
			fetchItemsByBoardId(formattedUuid, dispatch)
		);
	}, []);

	const grabItemIdsByColId = (colId) => {
		//you need to access the object in your filter
		let itemIds = Object.keys(itemColumnEntity.byId).filter((relation) => relation.column_id === colId);
		return itemIds.map((id) => itemsEntity.byId[id]);
	};
	const grabColumnIdsByBoardId = (boardId) => {
		//you need to access the object in your filter
		let columnIds = Object.keys(columnBoardEntity.byId).filter((relation) => relation.board_id === boardId);
		return columnIds.map((id) => columnsEntity.byId[id]);
	};

	const mapColumnsToBoard = () => {
		return grabColumnIdsByBoardId(boardId).map((column) => {
			let { colId, name } = column;
			let itemsByColId = grabItemIdsByColId(colId);
			return (
				<NewColumn columnId={colId}>
					<NewColumnHeader name={name} />
					<NewColumnBody items={itemsByColId} />
					<ActionButton description={'Add Card'}>
						<ActionInput name={'itemContent'} relationId={{ colId, boardId }} submitAction={addItem} />
					</ActionButton>
				</NewColumn>
			);
		});
	};

	const renderBoard = () => {
		return (
			<StyledBoard>
				{mapColumnsToBoard()}
				<ActionButton style={abStyles} description={'Add Column'}>
					<ActionInput name={'colName'} relationId={{ boardId }} submitAction={addColumn} />
				</ActionButton>
			</StyledBoard>
		);
	};
	const conditionallyRenderBoard = () => {
		const isFetchCompleteSuccess = fetchBoardSuccess && fetchItemSuccess && fetchColumnSuccess;
		switch (isFetchCompleteSuccess) {
			case true:
				return renderBoard();

			default:
				return <div>...Loading</div>;
		}
	};
	return conditionallyRenderBoard();
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
