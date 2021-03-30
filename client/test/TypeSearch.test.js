import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import {Marker} from 'react-leaflet';
import TypeSearch from '../src/components/Atlas/TypeSearch';
import { expect, it, toHaveBeenCalled } from '@jest/globals';

describe('TypeSearch', () => {
    let typeSearchWrapper;
    const helper = jest.fn();
    const type = ["airport","heliport","balloonport","other"];
    const serverSettings = {
        serverConfig: {
            type: type
        }
    } 

    beforeEach(() => {
        typeSearchWrapper = shallow(<TypeSearch type = {type}
                                                setType = {helper}
                                                serverSettings = {serverSettings}/>);
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

        expect(typeSearchWrapper.find('DropdownItem')).toHaveLength(4);
    
    });

    it('uses all branches of fillTypeArray', () => {
        typeSearchWrapper.instance().checkIfSelected("invalid value");
        typeSearchWrapper.instance().FillTypeArray("airport");
        typeSearchWrapper.instance().FillTypeArray("airport");

        expect(helper).toHaveBeenCalled();
    });
});
