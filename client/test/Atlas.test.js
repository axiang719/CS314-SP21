import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';
import { expect, it, toEqual } from '@jest/globals';


describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;


    beforeEach(() => {
        mockGeoLocateResponse();
        mockDistanceResponse();
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}
                                      getCurrentPosition = {createSnackBar}/>);
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

    it('tests clear list functionality', () =>{
        atlasWrapper.setState({listOfClicks: ["tokyo","osaka"]});
        const expectedArray = [];
        atlasWrapper.instance().clearList();
        expect(atlasWrapper.state().listOfClicks).toEqual(expectedArray);
    });

    it('tests removePlace functionality', () =>{
        atlasWrapper.setState({listOfClicks: ["tokyo","osaka"]});
        const expectedArray = ["osaka"];
        atlasWrapper.instance().removePlace(0);
        expect(atlasWrapper.state().listOfClicks).toEqual(expectedArray);
    });

    it('tests user location', () =>{
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn()
          };    
        global.navigator.geolocation = mockGeolocation;

        atlasWrapper.instance().requestUserLocation();
        expect(navigator.geolocation).toEqual(mockGeolocation);
    });

    it('tests return to initial trip', () =>{
        const place  = {latitude: 10.123456, longitude: 20.123456}
        atlasWrapper.setState({listOfClicks: [place]});
        atlasWrapper.instance().returnToInitialTrip();

        const expectedMapCenter = atlasWrapper.state().mapCenter;
        expect(expectedMapCenter.lat).toEqual(place.latitude);
        expect(expectedMapCenter.lng).toEqual(place.longitude);
    });
    
    // it('tests handle Geolocation', ()=>{
    //     const latlng = {lat: 10.123456,lng: 20.123456};
    //     atlasWrapper.instance().handleGeolocation(latlng);

    // });
    it('tests the geolocation error', ()=>{
        atlasWrapper.instance().handleGeolocationError();
        expect(console.log).toHaveBeenCalled();
    });

    it('calls handleDistances', () =>{
        const place  = {distances: 1000};
        atlasWrapper.setState({listOfClicks: [place]});

        const testArray = [1000];
        atlasWrapper.instance().handleDistancesResponse(testArray);
        expect(testArray[0]).toEqual(atlasWrapper.state().totalDistance);
    });

    it('tests get places', () =>{
        const place  = {address: "tokyo", latitude: 10.123456, longitude: 20.123456}
        atlasWrapper.setState({listOfClicks: [place]});
        const expectedArray = atlasWrapper.instance().getPlaces();

        expect(expectedArray.address).toEqual(atlasWrapper.state().listOfClicks.name);
    });

    it('tests get latlng', () =>{
        const latlng = {lat: 10.123456,lng: 20.123456};
        const trueString = atlasWrapper.instance().getLatLngText(latlng);
        const expectedString = "10.123456, 20.123456";

        expect(trueString).toEqual(expectedString);
    });

    it('calls show marker',() =>{
        atlasWrapper.instance().showMarkerPopup();
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
