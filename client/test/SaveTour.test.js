import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import SaveTour from '../src/components/Atlas/SaveTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import XLSX from "xlsx";

describe('SaveTour', () => {
    let saveWrapper;
    let mock = () => {return [{name:"test name", latitude: 50.0, longitude: 50.0}]};
    
    
    beforeEach(() => {
        saveWrapper = shallow(<SaveTour
                                getPlaces = {mock}/>);
    });

    it('initializes as expected', () => {
        expect(saveWrapper.find('Button').at(0).length).toEqual(1);
    });

    it('toggles the modal', () => {
        saveWrapper.instance().toggleModal();
        expect(saveWrapper.state().modalOpen).toEqual(true);
    });

    it('testing convert to string', () =>  {
        saveWrapper.instance().convertListOfClicksToString();
    });
});
