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
	tourRequest = TourRequest(request.places, request.earthRadius);
    });

    it('Sends request to api', () => {
        mockTourResponse();
	const response = tourRequest.sendRequest();
	    
	expect(response.requestType).toEqual(request.requestType);
	expect(response.earthRadius).toEqual(request.earthRadius);
	expect(response.response).toEqual(request.response);
	expect(response.places).toEqual(request.places);
    });

    it('Appropriately handles missing response', () => {
        const response = tourRequest.sendRequest();
        expect(response).toEqual(null);
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
