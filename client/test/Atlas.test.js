import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker, Polyline} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';
import { expect, it, toEqual } from '@jest/globals';


describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;


    beforeEach(() => {
        mockGeoLocateResponse();
        mockDistanceResponse();
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}/>);
    });

    it('initializes as expected', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
    });

    it('renders a marker on click', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

        const clickPosition = {lat: 0, lng: 0};
        simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});

        expect(atlasWrapper.state().markerPosition).toEqual(clickPosition);
        expect(atlasWrapper.find(Marker).length).toEqual(1);
    });

    it('extracts lines from object array', () => {
        const testPlaces = [{latitude: 0.0, longitude: 0.0},{latitude: 50.0, longitude: 50.0}]
        const expectedArray = [[[0.0, 0.0], [50.0, 50.0], [0.0, 0.0]], [[50.0, 50.0], [0.0, 0.0], [50.0, 50.0]]];
        const actualArray = atlasWrapper.instance().extractLines(testPlaces);

        expect(actualArray).toEqual(expectedArray);
    });

    function mockGeoLocateResponse() {
        const geoResponseData = {
            address: {
                LongLabel: "test label"
            }
        };
      
        fetch.mockResponse(JSON.stringify(geoResponseData));
   }

    function mockDistanceResponse() {
       const distResponseData = {
        
            "requestType"    : "distances",
            "places"         : [{"name":"place1", "latitude":  "40.6",  "longitude": "-105.1"},
                                {"name": "place2", "latitude":  "-33.9", "longitude": "151.2"},
                                {"name": "place3", "latitude":  "-57.9", "longitude": "175.2"}],
            "earthRadius"    : 6371.0,
            "distances"       : [1034, 785, 1503]
        };

        fetch.mockResponse(JSON.stringify(distResponseData))
   }

    function simulateOnClickEvent(wrapper, event) {
        wrapper.find('Map').at(0).simulate('click', event);
        wrapper.update();
    }
});
