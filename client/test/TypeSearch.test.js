import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React, { Component } from 'react';
import {Marker} from 'react-leaflet';
import TypeSearch from '../src/components/Atlas/TypeSearch';

import { it } from '@jest/globals';

describe('TypeSearch', () => {
    let typeSearchWrapper;
    const helper = jest.fn();
    const type = ["airport","heliport","balloonport","other"];

    beforeEach(() => {
        typeSearchWrapper = shallow(<TypeSearch type = {type}
                                                setType = {helper}/>);
        typeSearchWrapper.state().dropdownOpen = true;
    });

    it('initializes as expected', () => {
        expect(typeSearchWrapper.state().dropdownOpen).toEqual(true);
    });

    it('toggles the dropdown', () => {
        typeSearchWrapper.instance().toggleDropDown();
        const expectedToggle = false;
        const actualToggle = typeSearchWrapper.state().dropdownOpen;
        expect(actualToggle).toEqual(expectedToggle);
    });

    it('checks if selected', () => {
        typeSearchWrapper.instance().toggleDropDown();
        typeSearchWrapper.find('DropdownItem').at(0).simulate('click');
        typeSearchWrapper.update();

        typeSearchWrapper.find('DropdownItem').at(1).simulate('click');
        typeSearchWrapper.update();

        typeSearchWrapper.find('DropdownItem').at(2).simulate('click');
        typeSearchWrapper.update();

        typeSearchWrapper.find('DropdownItem').at(3).simulate('click');
        typeSearchWrapper.update();
    
    });
});