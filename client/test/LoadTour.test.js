import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import LoadTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import XLSX from "xlsx";

describe('LoadTour', () => {
    let loadTourWrapper;
    const testCSV = "C:\\fakepath\\processes.csv";
    const testJSON = "C:\\fakepath\\distances.json";
    const testInvalid = "C:\\fakepath\\tour.csv.docx";
    
    beforeEach(() => {
        loadTourWrapper = shallow(<LoadTour/>);
    });

    it('initializes as expected', () => {
        expect(loadTourWrapper.find("Button")).toHaveLength(2);
    });

    it('toggles the modal', () => {
        loadTourWrapper.instance().toggleModal();
        expect(loadTourWrapper.state().modalOpen).toEqual(true);
    });

    it('reads a file\'s type', () => {
      

        loadTourWrapper.instance().processFile({ target: { files: [{name: "testCSV"}] }});
        
        
        expect(loadTourWrapper.state().validFile).toEqual(false);
        expect(loadTourWrapper.state().fileType).toEqual("");
        
     

        loadTourWrapper.find('Input').at(0).simulate('e', { target: { value: testJSON }});
        loadTourWrapper.update();

    
        loadTourWrapper.find('Input').at(0).simulate('e', { target: { value: testInvalid }});
        loadTourWrapper.update();


        expect(loadTourWrapper.state().validFile).toEqual(false);
        expect(loadTourWrapper.state().fileType).toEqual("");
    });


    it('test to make sure else if hits csv in processFile' , () => {
        loadTourWrapper.instance().processFile({ target: { files: [{name: "processes.csv"}] }});
        loadTourWrapper.find('Input').at(0).simulate('e',{ target: { value: testCSV }});
        loadTourWrapper.update();
        
        expect(loadTourWrapper.state().fileType).toEqual(".csv");
        expect(loadTourWrapper.state().validFile).toEqual(true);
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

    it('checks for valid tour', () => {
        const validJson = [{"latitude" : "50.00", "longitude" : "50.00"}];
        const invalidJson = [{"name" : "this is missing latLng"}];
        const almostValidJson = [{"latitude" : "50.00"}]
        expect(loadTourWrapper.instance().isTourValid(validJson)).toEqual(true);
        expect(loadTourWrapper.instance().isTourValid(invalidJson)).toEqual(false);
        expect(loadTourWrapper.instance().isTourValid(almostValidJson)).toEqual(false);

     });
  
});