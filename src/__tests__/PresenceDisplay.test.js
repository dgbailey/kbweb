
import {mount} from 'enzyme';
import {PresenceDisplay} from '../PresenceDisplay';
import React from 'react';


describe('Unit Tests: Presence Display', () => {

    test('Presence Display successfully mounts to screen',() => {
        const wrapper = mount(<PresenceDisplay/>);
        expect(wrapper.containsMatchingElement(<PresenceDisplay/>)).toBe(true);

    });
    test('Presence Display displays "+ <number>" after collaborators exceeds 6',() => {

    });
})