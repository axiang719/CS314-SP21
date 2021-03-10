import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';
import { it, toEqual } from '@jest/globals';


describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;


    beforeEach(() => {
        mockGeoLocateResponse();
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

    // it('fills and clears a listOfClicks', () => {
    //     const clickPosition = {lat: 50, lng: 50};
    //     simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});
    //     atlasWrapper.find('#xButton').simulate('click');
    //     expect(atlasWrapper.state().listOfClicks).toEqual([]);

    //     simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});
    //     expect(atlasWrapper.state().listOfClicks).toEqual([{"lat": 50, "lng" : 50}]);
    //     atlasWrapper.find('#clear').simulate('click');
    //     expect(atlasWrapper.state().listOfClicks).toEqual([]);

    // });

    function mockGeoLocateResponse() {
      const responseData = {
         address: {
             LongLabel: "test label"
         }
      };
      
      fetch.mockResponse(JSON.stringify(responseData));
   }

    function simulateOnClickEvent(wrapper, event) {
        wrapper.find('Map').at(0).simulate('click', event);
        wrapper.update();
    }
});
