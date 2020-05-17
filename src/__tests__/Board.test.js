import * as ReactRedux from 'react-redux';
import React from 'react';
import {NewBoard} from '../NewBoard';
import {experimentalBoardState} from '../reducers/boardReducer';
import {mount} from 'enzyme';
import { TestingContext } from '../utilities/testing/configContext';
import {LoadingComponent} from '../LoadingComponent';
import * as httpUtils from '../utilities/http/parallelRequests';
import {SOCKET_CONN_MOUNT} from '../middleware/socketMiddleware';
describe('Board Component Tests',() => {
   
    let setUp = (additionalStateConfig = {activeBoard:'87242b88-d14a-4dfb-a377-b799a619880e'}) => {
        let mockStore = {expBoard:{...experimentalBoardState,...additionalStateConfig}};
        return mount(<TestingContext storeState={mockStore}><NewBoard/></TestingContext>)
    }

    test('Unit: Test board mounts',() => {
        let wrapper = setUp();
        expect(wrapper.containsMatchingElement(<NewBoard/>)).toBe(true);
        
    })
    test('Unit: Test board displays loading Ui',() => {
        let wrapper = setUp();
        expect(wrapper.containsMatchingElement(<LoadingComponent/>)).toBe(true)

    })
    test('Unit: Test parallel requests called on mount',() => {
        let mockUtility = jest.spyOn(httpUtils,'parallelRequests');
        setUp();
        expect(mockUtility).toHaveBeenCalledTimes(1);
    })
    test('Unit: Test web socket action dispatch on mount',() => {
        let mockUseDispatch = jest.spyOn(ReactRedux,'useDispatch');
        let mockDispatch = jest.fn();
        mockUseDispatch.mockImplementation(jest.fn(() => mockDispatch));
        setUp();
        //render phase calls are serialized. Still brittle though below.
        expect(mockDispatch.mock.calls[0][0].type).toBe(SOCKET_CONN_MOUNT);
    })
})