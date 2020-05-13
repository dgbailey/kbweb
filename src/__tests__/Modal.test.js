//modal toggle on board click
//modal toggle on button click
// import * as React from 'react';// Changes to objects outside the scope of the test seem to be persisted between tests. This can later on lead to unexpected results in other tests
//https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
import * as React from 'react';
import { NewBoard } from '../App';
import { TestingContext } from '../utilities/testing/configContext';
import { ModalContext, ModalProvider } from '../components/Modal/modalProvider';
import { Modal } from '../components/Modal/Modal';
import { mount } from 'enzyme';

describe('Modal Component tests', () => {
	//setup
	let MockProvider = ModalContext.Provider;
	let mockStoreData = { expBoard: { activeBoard: 2 }, addMemberStatus: false };

	//this integration will be easier after Board unit tests complete
	test.skip('Integration - Board renders with context necessary for testing modal', () => {
		let ui = (
			<ModalProvider>
				<NewBoard />
			</ModalProvider>
		);
		let wrapper = mount(TestingContext(ui, {}));
	});

	test('Unit - Handle change updates component state', () => {
		let useStateSpy = jest.spyOn(React, 'useState');
		let updateStateSpy = jest.fn(() => test);
		useStateSpy.mockImplementation(() => [ '', updateStateSpy ]);

		let wrapper = mount(
			<TestingContext storeState={mockStoreData}>
				<ModalProvider>
					<Modal />
				</ModalProvider>
			</TestingContext>
		);
		const event = { target: { name: 'userName', value: 'test-user' } };
		let input = wrapper.find('input[data-test="modal-input"]');
		input.simulate('change', event);
		expect(updateStateSpy).toHaveBeenCalledTimes(1);
		useStateSpy.mockRestore();
	});

	test('Unit - Modal displays correct share success state', () => {});

	test('Unit - Modal calls dispatch for sharing action', () => {});
});
