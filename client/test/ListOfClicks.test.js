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


    beforeEach(() => {
       ListWrapper = shallow(<ListOfClicks  clearList = {jest.fn()} 
                                            removePlace = {jest.fn()}
                                            listOfClicks = {list}
                                            centerMapToIndex = {jest.fn()}
                                            />); 
    });

    it("renders as expected", ()=>{
        expect(ListWrapper.find("Table")).toHaveLength(1);
        expect(ListWrapper.find("td")).toHaveLength(1);
    })

    it("shows and closes row info as expected", ()=>{
        expect(ListWrapper.find("Row")).toHaveLength(2);
        ListWrapper.find("Row").at(0).simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual(0)
        ListWrapper.find("Row").at(1).find("Button").at(1).simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual(null)
    })

    it("closes row info when clear is clicked", ()=>{
        ListWrapper.find("Row").at(0).simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual(0)
        ListWrapper.find("Button").at(0).simulate("click")
        expect(ListWrapper.state().toggleRow).toEqual(null)
    })

    it("changes toggle to null properly", ()=>{
        ListWrapper.instance().toggleHandler(0)
        expect(ListWrapper.state().toggleRow).toEqual(0)
        ListWrapper.instance().toggleHandler(0)
        expect(ListWrapper.state().toggleRow).toEqual(null)
    })
});