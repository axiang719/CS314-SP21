import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import FilterTour from "../src/components/Atlas/FilterTour";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import { BsJustifyLeft } from 'react-icons/bs';


describe('FilterTour', () => {
    let FilterWrapper;
    
    beforeEach(() => {
        FilterWrapper = shallow(<FilterTour
                                    listOfClicks = {[]}
                                    filterToggle = {true}
                                    toggleFilter = {jest.fn()}
                                />);
    });

    it('initializes correctly', () => {
        expect(FilterWrapper.find("Container")).toHaveLength(1);
    });

});