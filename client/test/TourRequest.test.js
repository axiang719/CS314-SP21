import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import { beforeEach, expect, it } from '@jest/globals';
import TourRequest from '../src/components/Atlas/TourRequest.js';

describe('Tour Request', () => {
    let tourRequest;
    
    const request = { 
	requestType: 'tour',
        earthRadius: 3959.0,
	response: 1.0,
        places: []
    };

    beforeEach(() => {
	tourRequest = new TourRequest(request.places, request.earthRadius);
    });

    it('Sends request to api', () => {
        mockTourResponse();
	setTimeout( () => {
	        const response = tourRequest.sendRequest("31413");  
	        expect(response.requestType).toEqual(request.requestType);
	        expect(response.earthRadius).toEqual(request.earthRadius);
	        expect(response.response).toEqual(request.response);
	        expect(response.places).toEqual(request.places);
    	}, 10);
    });

    async handleShortTourClick() {
        const length = this.props.listOfClicks.length
        if (length >= 2) {
            const oldList = this.props.getPlaces();
            const i = new TourRequest(oldList,3539);
            await i.sendRequest(this.props.serverSettings.serverPort);
            const newList = i.getPlaces();
            this.props.setTour(newList);
    }

    it('Appropriately handles missing response', () => {
	setTimeout( () => {
	    const response = tourRequest.sendRequest("31413");
            expect(response).toEqual({});
    	}, 10);
    });

    it('getPlaces works', () => {
        expect(tourRequest.getPlaces()).toEqual([]);
    });
	
    function mockTourResponse() {
        const responseData = {
            requestType: "tour",
            earthRadius: 3959.0,
	    response: 1,
            places: []
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }
});
