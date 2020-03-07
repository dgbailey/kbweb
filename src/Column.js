import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import uuid4 from 'uuid4';
import { Item } from './Item';

export const Column = (props) => {
	const { title, dispatch, col, id, index, colOrderKeys } = props;
	const { items, next, next_id, prev } = col;
	let state = useSelector((state) => state.board);

	const addCard = () => {
		//this now needs to dispatch an action
		let text = window.prompt();

		const card = {
			id: uuid4(),
			text: text
		};

		dispatch({ type: 'APPEND', destination: id, payload: card });

		//need new card with data
		//we need to add this card to our column state
	};

	//originally this function was pushing stale,
	//and unecessary information back into original state which the mapping function was
	//not written to process or reset ,causing items to have misinformation

	//track of their new previous and next positions
	//solution was to match pushed state to original schema in Board
	const moveColRight = () => {
		let nextIndex = next.index;
		let myIndex = index;
		let temp = colOrderKeys[nextIndex];
		let colOrderCopy = [ ...colOrderKeys ];
		colOrderCopy[nextIndex] = colOrderCopy[myIndex];
		colOrderCopy[myIndex] = temp;

		dispatch({ type: 'SETCOLORDER', payload: colOrderCopy });
	};
	const moveColLeft = () => {
		let prevIndex = prev.index;

		let myIndex = index;
		let temp = colOrderKeys[prevIndex];
		let colOrderCopy = [ ...colOrderKeys ];
		colOrderCopy[prevIndex] = colOrderCopy[myIndex];
		colOrderCopy[myIndex] = temp;

		dispatch({ type: 'SETCOLORDER', payload: colOrderCopy });
	};

	//drag data is only available on drop. Good to KNOW

	function checkCurrentColumnId(e) {
		let cId = state.currentColumn;

		if (cId === id) {
		} else {
			let qString = `[data-colid='${cId}']`;

			let previousColItems = document.querySelector(qString).children;

			for (let i = 0; i < previousColItems.length; i++) {
				previousColItems[i].classList.remove('slide-trigger-up');
			}

			dispatch({ type: 'UPDATE_CURRENT_COL', payload: id });
			//remove all slide up classes
		}
	}

	function dragoverHandler(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';

		//need initial condition for within column movement same column gt id, same column lt id

		let family = document.querySelectorAll('.dropzone');

		family.forEach((fm) => {
			fm.classList.remove('dropZoneIdentifier');

			if (fm.dataset.index === `${index}`) {
				fm.classList.add('dropZoneIdentifier');
			}
		});

		checkCurrentColumnId(e);
	}

	//give me last item that was displaced
	//if null place at end
	//otherwise
	//give me index of last displaced node
	//create linked list of current items: might be good to just use linked list from the start, will impace saving in DB
	//insert node
	//serializing linked list might be necessary

	function getFirstInsertionIndex(e) {
		let children = e.target.children;

		let child = null;
		//relies on children being in order
		//give me the first child that has the class of interest
		for (let i = 0; i < children.length; i++) {
			if (children[i].classList.contains('slide-trigger-up')) {
				child = children[i].dataset.index;
				break;
			}
		}
		return child;
	}

	class LinkedListNode {
		constructor(value) {
			this.next = null;
			this.value = value;
		}
	}

	function createLinkedList(colId) {
		let items = state.cols[colId].items;
		let head = null;
		let current = null;
		items.forEach((i) => {
			let newNode = new LinkedListNode(i);
			if (head === null && current === null) {
				head = newNode;
				current = head;
			} else {
				current.next = newNode;
				current = current.next;
			}
		});
		return head;
	}

	function createNewOrderLinkedList(colId, insertionIndex, newItemData) {
		//returns linkedlist for now
		let linkedList = createLinkedList(colId);
		let head = linkedList;
		let current = head;
		if (insertionIndex === null) {
			//back of list
			while (current.next !== null) {
				current = current.next;
			}
			current.next = new LinkedListNode(newItemData);
		} else if (insertionIndex === '0') {
			//before head
			let newNode = new LinkedListNode(newItemData);
			newNode.next = current;
			return newNode;
		} else if (insertionIndex === '1') {
			//use head
			let temp = current.next;
			current.next = new LinkedListNode(newItemData);
			current.next.next = temp;
		} else {
			let count = 0;
			while (count < insertionIndex) {
				current = current.next;
				count++;
			}

			current.next = new LinkedListNode(newItemData);
		}
		return head;
	}

	function mapLinkedListToArray(linkedList) {
		//return array
		//dispatch this array to appropriate col
		let returnArray = [];
		let current = linkedList;
		while (current) {
			returnArray.push(current.value);
			current = current.next;
		}
		return returnArray;
	}

	function dropHandler(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		let data = {};
		data['id'] = e.dataTransfer.getData('id');
		data['text'] = e.dataTransfer.getData('text');

		let firstInsertionIndex = getFirstInsertionIndex(e);
		let newOrderLinkedList = createNewOrderLinkedList(id, firstInsertionIndex, data);

		let newOrderArray = mapLinkedListToArray(newOrderLinkedList);

		// Get the id of the target and add the moved element to the target's DOM

		//dispatch event to column with card data , append to end no considering order
		e.target.classList.remove('dropZoneIdentifier');

		dispatch({ type: 'APPEND', destination: id, payload: newOrderArray });
	}

	//ondrag over vs on drag enter: on drag enter seems to block drop events on the same drop zone

	return (
		<StyledColumn>
			<div className={`header ${title}`}>
				<h1>{title}</h1>
				<button onClick={moveColLeft}>Move Left</button>
				<button onClick={moveColRight}>Move Right</button>
			</div>

			<div
				className="dropzone"
				data-index={index}
				data-colid={id}
				onDragOver={dragoverHandler}
				onDrop={dropHandler}
			>
				{items.map((ci, index) => (
					<Item
						dispatch={dispatch}
						colid={id}
						text={ci.text}
						prev={prev}
						next={next}
						next_id={next_id}
						key={ci.id}
						id={ci.id}
						index={index}
					/>
				))}
			</div>
			<button onClick={addCard}>Add Card</button>
		</StyledColumn>
	);
};

const StyledColumn = styled.div`
	border: 1px solid black;
	min-width: 218.75px;
	.header {
		height: 32px;

		&.title1 {
			background: #8e6e95;
		}

		&.title2 {
			background: #39a59c;
		}

		&.title3 {
			background: #344759;
		}

		&.title4 {
			background: #e8741e;
		}
	}

	.dropzone {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		&.dropZoneIdentifier {
			background: #d3d3d363;
		}
	}
`;
