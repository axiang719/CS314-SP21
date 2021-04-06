import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import LoadTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import XLSX from "xlsx";

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

        loadTourWrapper.instance().processFile({ target: { files: [{name: "testCSV"}] }});
        
        
        expect(loadTourWrapper.state().validFile).toEqual(false);
        expect(loadTourWrapper.state().fileType).toEqual("");
        
        loadTourWrapper.instance().processFile({ target: { files: [{name: "processes.csv"}] }});
        loadTourWrapper.find('Input').at(0).simulate('e',{ target: { value: testCSV }});
        loadTourWrapper.update();
        
        expect(loadTourWrapper.state().fileType).toEqual(".csv");
        expect(loadTourWrapper.state().validFile).toEqual(true);

        loadTourWrapper.find('Input').at(0).simulate('e', { target: { value: testJSON }});
        loadTourWrapper.update();

        // expect(loadTourWrapper.state().validFile).toEqual(true);
        // expect(loadTourWrapper.state().fileType).toEqual(".json");

        loadTourWrapper.find('Input').at(0).simulate('e', { target: { value: testInvalid }});
        loadTourWrapper.update();


        // expect(loadTourWrapper.state().validFile).toEqual(false);
        // expect(loadTourWrapper.state().fileType).toEqual("");
    });

    it('upload csv file tour', () => {
        const rows = [
            ["name","type","latitude","longitude"],
            ["Total Rf Heliport","heliport","40.07080078125","-74.9336013793945"],
            ["Lowell Field","small_airport","59.94919968","-151.695999146"],
            ["Newport Hospital & Clinic Heliport","heliport","35.608699798584","-91.2548980712891"] 
        ];
        
        let csvContent = "data:text/csv;charset=utf-8,";
        
        rows.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        loadTourWrapper.instance().upload({ target: { files: [csvContent] }});


    });
});