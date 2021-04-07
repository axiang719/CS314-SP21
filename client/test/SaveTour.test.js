import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import SaveTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import XLSX from "xlsx";

describe('SaveTour', () => {
    let saveWrapper;
    
    beforeEach(() => {
        saveWrapper = shallow(<SaveTour/>);
    });

    it('initializes as expected', () => {
        expect(saveWrapper.find('Button').at(0).length).toEqual(1);
    });
});