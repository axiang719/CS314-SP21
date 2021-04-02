import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import LoadTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';

describe('LoadTour', () => {
    let loadTourWrapper;
    
    beforeEach(() => {
        loadTourWrapper = shallow(<LoadTour/>);
    });

    it('initializes as expected', () => {
        expect(loadTourWrapper.find("Button")).toHaveLength(1);
    });

    it('toggles the modal', () => {
        loadTourWrapper.instance().toggleModal();
        expect(loadTourWrapper.state().modalOpen).toEqual(true);
    });

    it('reads a file\'s type', () => {
        const testCSV = "C:\\fakepath\\processes.csv";
        const testJSON = "C:\\fakepath\\distances.json";
        const testInvalid = "C:\\fakepath\\tour.csv.docx";

        expect(loadTourWrapper.state().validFile).toEqual(false);
        expect(loadTourWrapper.state().fileType).toEqual("");

        loadTourWrapper.find('Input').at(0).simulate('change', { target: { value: testCSV }});
        loadTourWrapper.update();

        expect(loadTourWrapper.state().validFile).toEqual(true);
        expect(loadTourWrapper.state().fileType).toEqual(".csv");

        loadTourWrapper.find('Input').at(0).simulate('change', { target: { value: testJSON }});
        loadTourWrapper.update();

        expect(loadTourWrapper.state().validFile).toEqual(true);
        expect(loadTourWrapper.state().fileType).toEqual(".json");

        loadTourWrapper.find('Input').at(0).simulate('change', { target: { value: testInvalid }});
        loadTourWrapper.update();

        expect(loadTourWrapper.state().validFile).toEqual(false);
        expect(loadTourWrapper.state().fileType).toEqual("");
    });
});