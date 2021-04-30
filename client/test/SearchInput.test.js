import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import SearchInput from '../src/components/Atlas/SearchInput';
import { beforeEach, expect, it, jest } from '@jest/globals';

describe('SearchInput', () => {
    const serverSettings = {serverConfig: {features: ["find"]}};
    const checkForFeature = () => {return true};
    const toggleSearch = jest.fn();


    let searchWrapper;

    beforeEach(() => {
        searchWrapper = shallow(<SearchInput
                                    serverSettings = {serverSettings}
                                    checkForFeature = {checkForFeature}
                                    toggleSearch = {toggleSearch}
                                />);
    });

    it('initializes as expected', () => {
        const actualInputText = searchWrapper.state().inputText;
        const actualSearchType = searchWrapper.state().findSearch;
        
        const expectedInputText = "";
        const expectedSearchType = true;

        expect(actualInputText).toEqual(expectedInputText);
        expect(actualSearchType).toEqual(expectedSearchType);
    });

    it('updates input as expected', () => {
        simulateInput(searchWrapper, "dave");
        expect(searchWrapper.state().inputText).toEqual("dave");
    });

    it('changes search type as expected', () => {
        expect(searchWrapper.state().findSearch).toEqual(true);
        simulateInput(searchWrapper, "50, 50");
        expect(searchWrapper.state().findSearch).toEqual(false);
    });

    it('toggles type and where', () => {
        expect(searchWrapper.state().filterToggle).toEqual(false);
        searchWrapper.find('Button').at(0).simulate('click');
        expect(searchWrapper.state().filterToggle).toEqual(true);
    });

    it("closes the search component when 'x' is clicked", () => {
        expect(toggleSearch).toHaveBeenCalledTimes(0);
        searchWrapper.find("BsX").simulate('click');
        expect(toggleSearch).toHaveBeenCalled();
    });

    function simulateInput(wrapper, input) {
        wrapper.find('Input').at(0).simulate('change', { target: { value: input } });
        wrapper.update();
    };
});
