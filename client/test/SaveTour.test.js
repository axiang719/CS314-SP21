import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import SaveTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import XLSX from "xlsx";

describe('SaveTour', () => {
    let saveTourWrapper;
    
    beforeEach(() => {
        saveTourWrapper = shallow(<SaveTour/>);
    });

    it('is a placeholder test', () =>{
       
    });
    
});