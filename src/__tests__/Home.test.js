import React from 'react';
import { TestingContext } from '../utilities/testing/configContext';
import { Home } from '../Home';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { initialState } from '../reducers/userMetaDataReducer/';
import uuid4 from 'uuid4';
import * as formatUuid from '../utilities/formatBoardUuid';
const formattingSpy = jest.spyOn(formatUuid, 'formatBoardUuid');

describe('Home component Tests', () => {
	let boardIds = [
		' 87242b88-d14a-4dfb-a377-b799a619880e',
		'87242b88-d14a-4dfb-a377-b799a639880e',
		'87242b88-d14a-4dfb-a377-b792a619880e '
	].map((id) => ({ board_id: id, name: 'generic' }));
	let wrapper;
	let context;
	beforeAll(() => {
		context = (
			<TestingContext storeState={{ userMetaData: { ...initialState, boardIds } }}>
				<Home />
			</TestingContext>
		);
		wrapper = mount(context);
	});

	test('Tests mount', () => {
		expect(wrapper.containsMatchingElement(<Home />)).toBe(true);
	});

	test(`Tests Uuid utility to be called ${boardIds.length} times.`, () => {
		expect(formattingSpy).toHaveBeenCalledTimes(boardIds.length);
	});

	test('Home correctly with appropriate ${boardIds.length} Preview Children', () => {
		//uuids will change snapshot every test
		const tree = renderer.create(wrapper).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// test('Tests Create new board function called on button click', () => {
	// 	let createBoardSpy = jest.spyOn(Home, 'addNewBoard');
	// 	wrapper.find('button').simulate('click');
	// 	expect(createBoardSpy).toHaveBeenCalledTimes(1);
	// });

	//Is it necessary to test functions within functional components? Is it possible?
});
