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
        places: [{
		    "name": "initial",
		    "latitude": "0.0",
		    "longitude": "0.0"
	    }]
    };

    beforeEach(() => {
	mockTourResponse();
	tourRequest = new TourRequest(request.places, request.earthRadius);
    });

    it('Sends request to api', () => {
        tourRequest.sendRequest();
        expect(tourRequest.getPlaces()).toEqual([{
		    "name": "final",
		    "latitude": "0.0",
		    "longitude": "0.0"
	    }]);

    });

    it('getRequestPlaces works', () => {
        expect(tourRequest.getRequestPlaces()).toEqual([{
		    "name": "initial",
		    "latitude": "0.0",
		    "longitude": "0.0"
	    }]);
    });
	
    function mockTourResponse() {
        const responseData = {
            requestType: "tour",
            earthRadius: 3959.0,
	    response: 1,
            places: [{
		    "name": "final",
		    "latitude": "0.0",
		    "longitude": "0.0"
	    }]
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }
});
