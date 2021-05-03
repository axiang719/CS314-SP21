import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import FilterTour from "../src/components/Atlas/FilterTour";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";


describe('FilterTour', () => {
    let FilterWrapper;
    
    beforeEach(() => {
        FilterWrapper = shallow(<FilterTour
                                    listOfClicks = {[]}
                                />);
    });

    it('initializes correctly', () => {
        expect(FilterWrapper.state().modalToggle).toEqual(false);
    });

    it('toggles the modal when clicked', () => {
        FilterWrapper.find("BsFilter").at(0).simulate("click");
        expect(FilterWrapper.state().modalToggle).toEqual(true);
    });

});