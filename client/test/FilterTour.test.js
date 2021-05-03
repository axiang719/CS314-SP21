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

    it('generates the right search options', () => {
        const expectedOptions = [{value: "place", label: "place"}];
        const searchArray = [{name: 'place,'}];
        const actualOptions = FilterWrapper.instance().getSearchOptions(searchArray);
        expect(actualOptions).toEqual(expectedOptions)
        const noOptions = FilterWrapper.instance().getSearchOptions();
        expect(noOptions).toEqual([]);
    });

});