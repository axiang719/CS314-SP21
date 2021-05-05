import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import LoadTour from '../src/components/Atlas/LoadTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';
import * as testJson from "./testFile";

describe('LoadTour', () => {
    let loadTourWrapper;
    const jsonMock = jest.fn();
    const csvMock = jest.fn();
    const setTour = jest.fn();
    const testCSV = "C:\\fakepath\\processes.csv";
    const testJSON = "C:\\fakepath\\distances.json";
    const testInvalid = "C:\\fakepath\\tour.csv.docx";
    
    beforeEach(() => {
        loadTourWrapper = shallow(<LoadTour
                                    setTour = {setTour}
                                    />);
    });

    it('initializes as expected', () => {
        expect(loadTourWrapper.find("Button")).toHaveLength(1);
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


    it('test to make sure else if hits processFile' , () => {
        loadTourWrapper.instance().uploadCsvFile = csvMock;
        loadTourWrapper.instance().uploadJsonFile = jsonMock;

        loadTourWrapper.instance().processFile({ target: {  files: [{name: "processes.json"}]}});
        loadTourWrapper.instance().processFile({ target: { files: [{name: "processes.csv"}] }});
        loadTourWrapper.find('Input').at(0).simulate('e',{ target: { value: testCSV }});
        loadTourWrapper.update();
        
        expect(csvMock).toHaveBeenCalled();
        expect(jsonMock).toHaveBeenCalled();
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
        loadTourWrapper.instance().csvOnload({ target: { files: [csvContent] }});
    });

    it('checks for valid tour', () => {
        const validJson = {places: [{"latitude" : "50.00", "longitude" : "50.00"}]};
        const invalidJson = [{"name" : "this is missing latLng"}];
        const almostValidJson = [{"latitude" : "50.00"}]
        expect(loadTourWrapper.instance().isTourValid(validJson)).toEqual(true);
        loadTourWrapper.instance().checkTour(validJson);
        expect(loadTourWrapper.state().validTour).toEqual(true);
        expect(loadTourWrapper.instance().isTourValid(invalidJson)).toEqual(false);
        expect(loadTourWrapper.instance().isTourValid(almostValidJson)).toEqual(false);
    });

    it('uploads a JSON file', ()=>{   
        var jsonString = JSON.stringify(testJson);
        const event = {
                target: { files: [{ name: "testJson.json"}],
                result: jsonString
            }
        }  
        loadTourWrapper.instance().jsonOnload(event);
    });
    
    it('test coverage for convertToJsonObj', () => {
        const validJson = {places: [{"latitude" : "50.00", "longitude" : "50.00"}]};
        const distance = [{distances :["1034","785"]}];
        const validJson2 = {places: [{"latitude" : "50.00", "longitude" : "50.00"}]};
        loadTourWrapper.instance().parsePlace(validJson,distance,validJson2 );
        loadTourWrapper.instance().convertToJsonObj(validJson);
        loadTourWrapper.instance().convertToJsonObj(distance);

    });
    
    it('adds a tour to the map', ()=>{
        loadTourWrapper.state().tourUpload = {places: [{latitude: "50.00", longitude: "50.00"}]}   
        loadTourWrapper.instance().addTourToMap();
        expect(setTour).toHaveBeenCalled();
    });
});