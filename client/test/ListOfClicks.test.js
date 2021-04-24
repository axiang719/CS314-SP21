import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, ModalHeader, ModalBody, UncontrolledPopover} from 'reactstrap';
import ListOfClicks from '../src/components/Atlas/ListOfClicks';
import { expect, it, jest } from '@jest/globals';

describe('ListOfClicks', () => {
    let ListWrapper;
    const list = [
        {
            "address" : "Place",
            "distance" : 0,
            "latitude" : 50.00,
            "longitude" : 50.00   
        }];

    const checkForFeature = function() {
        return true;
    }

    beforeEach(() => {
       ListWrapper = shallow(<ListOfClicks  clearList = {jest.fn()} 
                                            removePlace = {jest.fn()}
                                            listOfClicks = {list}
                                            centerMapToIndex = {jest.fn()}
                                            checkForFeature = {checkForFeature}
                                            />); 
    });

    it("renders as expected", ()=>{
        expect(ListWrapper.find("Table")).toHaveLength(1);
        expect(ListWrapper.find("td")).toHaveLength(1);
    })

    it("shows and closes row info as expected", ()=>{
        expect(ListWrapper.find("Row")).toHaveLength(3);
        ListWrapper.find("Row").at(1).simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(true);
        ListWrapper.find("Row").at(1).simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(false);
    })

    it("closes row info when clear is clicked", ()=>{
        ListWrapper.find("Row").at(1).simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(true);
        ListWrapper.setState({settingsToggle: true});
        ListWrapper.find("DropdownItem").at(0).simulate("click");
        expect(ListWrapper.state().toggleRow).toEqual([]);
    })

    it("changes toggle properly on remove row", ()=>{
        ListWrapper.find("Row").at(1).simulate("click");
        expect(ListWrapper.state().toggleRow.length).toEqual(1);
        ListWrapper.find("Row").at(2).find("Button").at(1).simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual([]);
    })

    it('toggles the settings dropdown', () => {
        expect(ListWrapper.state().settingsToggle).toBe(false);
        ListWrapper.instance().toggleSettings();
        expect(ListWrapper.state().settingsToggle).toBe(true);
    });
});