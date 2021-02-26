import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {InputGroup, DropdownItem} from 'reactstrap';

import CoordinatesInput from '../src/components/Atlas/CoordinatesInput';
import { beforeEach, expect, it } from '@jest/globals';

describe('CoordinatesInput', () => {

    let coordInWrapper;

    beforeEach(() => {
        coordInWrapper = shallow(<CoordinatesInput/>);
    });

    it('initializes as expected', () => {
        const actualSearchType = coordInWrapper.state().searchType;
        const expectedSearchType = "Coordinates";

        expect(actualSearchType).toEqual(expectedSearchType);
    });

    it('changes type as expected', () => {
        const actualSearchType = coordInWrapper.state().searchType;
        const expectedSearchType = "Coordinates";

        expect(actualSearchType).toEqual(expectedSearchType);

        simulateOnClickEvent(coordInWrapper);
        
        const actualSearchType2 = coordInWrapper.state().searchType;
        const expectedSearchType2 = "Match"

        expect(actualSearchType2).toEqual(expectedSearchType2);
    });
    
    function simulateOnClickEvent(wrapper) {
        wrapper.find('DropdownItem').at(0).simulate('click');
        wrapper.update();
    }
});