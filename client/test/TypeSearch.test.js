import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import TypeSearch from '../src/components/Atlas/TypeSearch';
import { expect, it, jest } from '@jest/globals';

describe('TypeSearch', () => {
    let typeSearchWrapper;
    const helper = jest.fn();
    const type = ["airport","heliport","balloonport","other"];
    const serverSettings = {
        "serverConfig": {
            "type": type
        }
    } 

    beforeEach(() => {
        typeSearchWrapper = shallow(<TypeSearch 
                                        type = {type}
                                        setType = {helper}
                                        serverSettings = {serverSettings}
                                    />);
    });

    it('initializes as expected', () => {
        expect(typeSearchWrapper.find("Button")).toHaveLength(4);
    });

    it('adds to the type array when clicked', () => {
        expect(helper).toHaveBeenCalledTimes(0);
        typeSearchWrapper.find("Button").at(0).simulate('click');
        typeSearchWrapper.find("Button").at(1).simulate('click');
        typeSearchWrapper.find("Button").at(2).simulate('click');
        typeSearchWrapper.find("Button").at(3).simulate('click');
        expect(helper).toHaveBeenCalledTimes(4);
    });

    it('adds new type', () => {
        typeSearchWrapper.instance().fillTypeArray("tokyo");
        expect(helper).toHaveBeenCalledTimes(5);
    })
});
