//modal toggle on board click
//modal toggle on button click
// import * as React from 'react';// Changes to objects outside the scope of the test seem to be persisted between tests. This can later on lead to unexpected results in other tests
//https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
import * as React from 'react';
import * as ModalActions from '../actions/addMemberToBoard';
import { NewBoard } from '../App';
import { TestingContext } from '../utilities/testing/configContext';
import { ModalContext, ModalProvider } from '../components/Modal/modalProvider';
import { Modal } from '../components/Modal/Modal';
import { mount } from 'enzyme';

describe('Modal Component tests', () => {
	//setup
	let MockProvider = ModalContext.Provider;
	let wrapper;
	let setUp = () => {
		let mockStoreData = { expBoard: { activeBoard: 2 }, addMemberStatus: true };
		return mount(
			<TestingContext storeState={mockStoreData}>
				<ModalProvider>
					<Modal />
				</ModalProvider>
			</TestingContext>
		);
	};

	//this integration will be easier after Board unit tests complete
	test.skip('Integration - Board renders with context necessary for testing modal', () => {});

	test('Unit - Handle change updates component state', () => {
		let useStateSpy = jest.spyOn(React, 'useState');
		let updateStateSpy = jest.fn(() => test);
		useStateSpy.mockImplementation(() => [ '', updateStateSpy ]);

		let wrapper = setUp();
		const event = { target: { name: 'userName', value: 'test-user' } };
		let input = wrapper.find('input[data-test="modal-input"]');
		input.simulate('change', event);
		expect(updateStateSpy).toHaveBeenCalledTimes(1);
		useStateSpy.mockRestore();
	});

	test('Unit - Modal mounts successfully', () => {
		let wrapper = setUp();
		expect(wrapper.containsMatchingElement(<Modal />)).toBe(true);
	});

	test('Unit - Modal displays correct share success state', () => {
		let wrapper = setUp();
		expect(wrapper.find('div[data-test="share-success-ui"]').length).toBe(1);
	});

	test('Unit - Modal calls redux action creator for sharing board', () => {
		let addMemberSpy = jest.spyOn(ModalActions, 'addMemberToBoard');
		addMemberSpy.mockImplementation(() => {});

		let wrapper = setUp();
		const event = { target: { name: 'userName', value: 'test-user' } };
		let input = wrapper.find('input[data-test="modal-input"]');
		input.simulate('change', event);

		let btn = wrapper.find('button[data-test="share-action-btn"]');
		btn.simulate('click');
		expect(addMemberSpy).toHaveBeenCalledTimes(1);
	});
});
