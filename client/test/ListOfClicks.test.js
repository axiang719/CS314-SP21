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
            "name" : "Place",
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
        const clickable = ListWrapper.find("Row").at(1).find("Col").at(0)
        expect(ListWrapper.find("Row")).toHaveLength(4);
        clickable.simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(true);
        clickable.simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(false);
    })

    it("closes row info when clear is clicked", ()=>{
        ListWrapper.find("Row").at(1).find('Col').at(0).simulate("click");
        expect(ListWrapper.state().toggleRow[0]).toEqual(true);
        ListWrapper.setState({settingsToggle: true});
        ListWrapper.find("DropdownItem").at(1).simulate("click");
        expect(ListWrapper.state().toggleRow).toEqual([]);
    })

    it("changes toggle properly on remove row", ()=>{
        ListWrapper.find("Row").at(1).find('Col').at(0).simulate("click");
        expect(ListWrapper.state().toggleRow.length).toEqual(1);
        ListWrapper.find("Row").at(1).find("BsTrash").simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual([]);
    })

    it('toggles the settings dropdown', () => {
        expect(ListWrapper.state().settingsToggle).toBe(false);
        ListWrapper.instance().toggleSettings();
        expect(ListWrapper.state().settingsToggle).toBe(true);
    });

    it('toggles meatballs', ()=> {
        ListWrapper.setState({index: 1});
        ListWrapper.instance().toggleMeatballs(1);
        expect(1).toEqual(ListWrapper.state().index);
    })

    it('renders notes', () => {
        expect(ListWrapper.state().notesToggle).toEqual(-1);

        ListWrapper.setState({notesToggle: 1});
        ListWrapper.instance().setNotes(1);
        expect(ListWrapper.state().notesToggle).toEqual(1);
    })

    it('toggles the filter component', () => {
        expect(ListWrapper.state().filterToggle).toEqual(false);
        ListWrapper.instance().toggleFilter();
        expect(ListWrapper.state().filterToggle).toEqual(true);
    });

    it('updates filter input when called', () => {
        expect(ListWrapper.state().filterInput).toEqual("");
        ListWrapper.instance().updateFilterInput("Blah");
        expect(ListWrapper.state().filterInput).toEqual("Blah");
    });
});