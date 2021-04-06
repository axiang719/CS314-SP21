import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import { beforeEach, expect, it } from '@jest/globals';
import TourRequest from '../src/components/Atlas/TourRequest.js';

describe('Tour Request', () => {

    const showMessage = jest.fn();
    const request = { requestType: 'tour',
            earthRadius: 3959.0,
	    response: 1.0,
            places: []
    };

    beforeEach(() => {
        mockTourResponse();
    });

    it('Sends request to api', () => {
	    const response = TourRequest.sendRequest(request);
	    expect(response.requestType).toEqual(request.requestType);
	    expect(response.earthRadius).toEqual(request.earthRadius);
	    expect(response.response).toEqual(request.response);
	    expect(response.places).toEqual(request.places);
    });

    it('Sends fails with bad api request', () => {
        const response = TourRequest.sendRequest({"name": "and nothing else"});
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
