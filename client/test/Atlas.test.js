import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker, Polyline} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';
import { afterEach, expect, it, jest, toEqual } from '@jest/globals';

describe('Atlas', () => {
    const createSnackBar = jest.fn();
    const fakeZoom = jest.fn();
    let atlasWrapper;
    let serverSettings = {serverConfig: {features: ['config','find','type','where','distances','tour']}};
    
    beforeEach(() => {
        mockGeoLocateResponse();
        mockDistanceResponse();
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}
                                      getCurrentPosition = {createSnackBar}
                                      serverSettings = {serverSettings}/>);
        atlasWrapper.setState({listOfClicks: ["osaka","tokyo"]});
        atlasWrapper.instance().mapRef = {current: {leafletElement: {getZoom: fakeZoom}}}
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
              coords: {
                latitude: 10.123456,
                longitude: 20.123456
            }
        };
        global.navigator.geolocation = mockGeolocation;

        atlasWrapper.instance().requestUserLocation();
        atlasWrapper.instance().handleGeolocation(mockGeolocation);

        expect(navigator.geolocation).toEqual(mockGeolocation);
    });

    it('tests center map', ()=>{
        const place  = {name: "tokyo", latitude: 10.123456, longitude: 20.123456};
        atlasWrapper.setState({listOfClicks: [place]});
        atlasWrapper.instance().centerMapToIndex(0);

        expect(atlasWrapper.state().address).toEqual(place.name);
    })
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
        const place  = {address: "tokyo", latitude: 10.123456, longitude: 20.123456};
        atlasWrapper.setState({listOfClicks: [place]});
        const expectedArray = atlasWrapper.instance().getPlaces();

        expect(expectedArray.address).toEqual(atlasWrapper.state().listOfClicks.name);
    });

    it('calls show marker',() =>{
        atlasWrapper.instance().showMarkerPopup();
    });

    it('extracts lines from object array', () => {
        const testPlaces = [{latitude: 0.0, longitude: 0.0},{latitude: 50.0, longitude: 50.0}]
        const expectedArray = [[[0.0, 0.0], [50.0, 50.0], [0.0, 0.0]], [[50.0, 50.0], [0.0, 0.0], [50.0, 50.0]]];
        const actualArray = atlasWrapper.instance().extractLines(testPlaces);

        expect(actualArray).toEqual(expectedArray);
    });

    it('sets a new tour', async () => { 
        const testJson = [{ latitude: "50.00", longitude: "50.00" }];
        const expectedJson = [{ latitude: 50, longitude: 50, name: "Unknown" }];
        await atlasWrapper.instance().setTour(testJson);
        await atlasWrapper.instance().setTour(expectedJson);
        expect(atlasWrapper.state().listOfClicks).toEqual(expectedJson);
    });

    it('tests checkForFeature null conditional', ()=>{
        serverSettings.serverConfig = null;
        expect(atlasWrapper.instance().checkForFeature('type')).toEqual(false);
    });

    it('only sends distance request if  supported', async () => {
        atlasWrapper.setState( {totalDistance: 100} );
        serverSettings = {serverConfig: {features: ['config','find','type','where','tour']}};
        await atlasWrapper.instance().handleDistances();

        const actualDist = atlasWrapper.state().totalDistance;
        const expectedDist = 0;

        expect(actualDist).toEqual(expectedDist);
    });

    it('toggles the search bar', () => {
        expect(atlasWrapper.find("SearchInput")).toHaveLength(0);
        atlasWrapper.instance().toggleSearch();
        expect(atlasWrapper.find("SearchInput")).toHaveLength(1);
    });

    it('tests newStartingPlace', () =>{
        atlasWrapper.instance().selectNewStartingLocation(1);
    });

    it('tests rgbCallback', () =>{
        atlasWrapper.instance().rgbCallback('#11a1e8');
        expect(atlasWrapper.state().rgb).toEqual('#11a1e8');
    });

    it('tests setLineWidth', () =>{
        atlasWrapper.instance().setLineWidth(5);
        expect(atlasWrapper.state().lineWidth).toEqual(5);
    })
    
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
