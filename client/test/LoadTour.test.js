import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import LoadTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';

describe('LoadTour', () => {
    let loadTourWrapper;
    
    beforeEach(() => {
        loadTourWrapper = shallow(<LoadTour/>);
    });

    it('initializes as expected', () => {
        expect(loadTourWrapper.find("Button")).toHaveLength(1);
    });
});