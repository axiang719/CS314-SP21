import './jestConfig/enzyme.config.js';

import React from 'react';
import {shallow} from 'enzyme';

import FilterTour from "../src/components/Atlas/FilterTour";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import { BsJustifyLeft } from 'react-icons/bs';


describe('FilterTour', () => {
    let FilterWrapper;
    const toggleFilter = jest.fn();
    const updateFilterInput = jest.fn();
    
    beforeEach(() => {
        FilterWrapper = shallow(<FilterTour
                                    listOfClicks = {[]}
                                    filterToggle = {true}
                                    toggleFilter = {toggleFilter}
                                    updateFilterInput = {updateFilterInput}
                                />);
    });

    it('initializes correctly', () => {
        expect(FilterWrapper.find("Container")).toHaveLength(1);
    });

    it('toggles the filter', () => {
        FilterWrapper.find("BsX").at(0).simulate("click");
        expect(toggleFilter).toHaveBeenCalled();
    });

    it('updates the filter input in listOfClicks', () => {
        const input = FilterWrapper.find('Input').at(0);
        input.simulate("change", { target: { value: 'Blah!' } });
        expect(updateFilterInput).toHaveBeenCalled();
    });

    it('doesnt render when false', () => {
        const altFilter = shallow(<FilterTour
            filterToggle = {false}
        />);

        expect(altFilter.find("Container")).toHaveLength(0);
    });

});