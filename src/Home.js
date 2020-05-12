import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Preview } from './Preview';
import { formatBoardUuid } from './utilities/formatBoardUuid';
import {addBoard} from './actions/addBoard';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

export const Home = () => {

	const boardMetaData = useSelector((state) => state.userMetaData.boardIds);
	const dispatch = useDispatch();
	const history = useHistory();
	const boardURIprefix = '/board/existing';
	const userMetaData = useSelector((state) => state.userMetaData);
	const { id: userId } = userMetaData;
	const name = 'Get-Started';

	async function addNewBoard(){
		let board = await addBoard({userId,name},dispatch);
		let newUri = boardURIprefix + "/" + name + "-" + formatBoardUuid(board.board_id)
		history.push(newUri)

	}
	function renderPreviews(){
		
			return (
				<>
			
				{boardMetaData.map((b) => (
					<Preview
						to={boardURIprefix +'/' + b.name + '-' + formatBoardUuid(b.board_id)}
						key={b.board_id}
						id={b.board_id}
						name={b.name}
					/>
				))}
				</>
			)
		}
	

	return (
		<StyledHome>
			<button onClick={addNewBoard}>Create New Board</button>
			{boardMetaData.length > 0 && renderPreviews()}
		</StyledHome>
	)
};

const StyledHome = styled.section`
	height: 100%;
	width: 100%;
	border: 1px solid red;
	display: flex;
	flex-wrap: wrap;
`;
