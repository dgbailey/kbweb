import React from 'react';
import {mount} from 'enzyme';
import { ModalContext, ModalProvider } from '../components/Modal/modalProvider';
import {BannerNav} from '../BannerNav';
import { TestingContext } from '../utilities/testing/configContext';
import {NewBoard} from '../NewBoard';
import {experimentalBoardState} from '../reducers/boardReducer/';
import { Modal } from '../components/Modal/Modal';
import { ModalRoot } from '../components/Modal/ModalRoot';
import {BannerButton} from '../BannerButton';
import { ModalConsumer } from '../components/Modal/ModalRoot';


describe('BannerNav integration tests',() => {
    let setUp = (additionalConfig = {fetchBoardSuccess:true,fetchItemSuccess:true,fetchColumnSuccess:true}) => {
        let mockStoreData = {expBoard:{...experimentalBoardState,...additionalConfig}};
        return mount(<TestingContext storeState={mockStoreData}>
            <ModalProvider>
                <ModalRoot />
                <BannerNav>
                    <BannerButton name={'Home'} />
                    <ModalConsumer>
                        {(value) => {
                            return <BannerButton data={'banner-btn-share'} onClick={() => value.toggleModal(Modal)} name={'Share'} />;
                        }}
                    </ModalConsumer>
                </BannerNav>
                <ModalConsumer>
                    {(value) => {
                        return (
                            <NewBoard
                                onClick={() => {
                                    value.data.isOpen && value.toggleModal(Modal);
                                }}
                                onMountNewUser={false}
                            />
                        );
                    }}
                </ModalConsumer>
                </ModalProvider>
        </TestingContext>)
        
    }

    test('Integration: BannerNav renders with , Banner Button, and Board.',() => {
        let wrapper = setUp();
        //strange: if you use JSX below you get incorrect results
        expect(wrapper.containsMatchingElement(BannerNav)).toBe(true);
        expect(wrapper.containsMatchingElement(BannerButton)).toBe(true);
        expect(wrapper.containsMatchingElement(NewBoard)).toBe(true);
    });

    test('Integration: Banner Button Click toggles Modal UI onscreen', () => {
        let wrapper = setUp();
        expect(wrapper.containsMatchingElement(<Modal/>)).toBe(false);
        let bannerBtn = wrapper.find('button[data-test="banner-btn-share"]');
        bannerBtn.simulate('click');
        expect(wrapper.containsMatchingElement(<Modal/>)).toBe(true);
    })

    test('Integration: Board Click toggles Modal offscreen', () => {
        let wrapper = setUp();
        let bannerBtn = wrapper.find('button[data-test="banner-btn-share"]');
        bannerBtn.simulate('click');
        expect(wrapper.containsMatchingElement(<Modal/>)).toBe(true);
        let board = wrapper.find('section[data-test="board"]');
        board.simulate('click');
        expect(wrapper.containsMatchingElement(<Modal/>)).toBe(false);
    })
})