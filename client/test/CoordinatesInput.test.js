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
        coordInWrapper.find('DropdownItem').at(1).simulate('click');
        coordInWrapper.update();

        const actualSearchType = coordInWrapper.state().searchType;
        const expectedSearchType = "Coordinates";

        expect(actualSearchType).toEqual(expectedSearchType);

        simulateOnClickEvent(coordInWrapper);
        
        const actualSearchType2 = coordInWrapper.state().searchType;
        const expectedSearchType2 = "Match"

        expect(actualSearchType2).toEqual(expectedSearchType2);
    });

    it('toggles the dropdown', () => {
        coordInWrapper.instance().toggleDropDown();
        const expectedToggle = true;
        const actualToggle = coordInWrapper.state().dropdownOpen;
        expect(actualToggle).toEqual(expectedToggle);
    });

    it('updates input as expected', () => {
        simulateInput(coordInWrapper, "50.00, 50.00");
        expect(coordInWrapper.state().coordinates.inputText).toEqual("50.00, 50.00");
        expect(coordInWrapper.state().coordinates.latLng).toEqual({lat: 50.00, lng: 50.00});

        simulateInput(coordInWrapper, "Bad Input");
        expect(coordInWrapper.state().coordinates.latLng).toEqual(null);
    });

    function simulateInput(wrapper, input) {
        wrapper.find('Input').at(0).simulate('change', { target: { value: input } });
        wrapper.update();
    };
    
    function simulateOnClickEvent(wrapper) {
        wrapper.find('DropdownItem').at(0).simulate('click');
        wrapper.update();
    };
});