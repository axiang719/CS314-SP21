import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import { beforeEach, expect, it } from '@jest/globals';
import TourRequest from '../src/components/Atlas/TourRequest.js';

describe('Tour Request', () => {

    let tourRequestWrapper;
    
    const showMessage = jest.fn();
    const request = { requestType: 'tour',
            earthRadius: 3959.0,
	    response: 1.0,
            places: []
    };


    beforeEach(() => {
        mockDistancesResponse();
        distancesSearchWrapper = shallow(<DistancesSearch
                                            showMessage = {showMessage}
                                        />);
        console.log(distancesSearchWrapper);
    });


    it('initializes as expected', () => {
        const actualRequestType = distancesSearchWrapper.state().distancesRequest.requestType;
        const expectedRequestType = "distances";

        expect(actualRequestType).toEqual(expectedRequestType);
    });


    it('Sends request to api', () => {
        distancesSearchWrapper.instance().sendDistancesRequest(request);
        setTimeout( () => {
            const actualDistances = distancesSearchWrapper.state().distances;
            expect(actualDistances).toEqual([500]);}, 10);

    });


    it('Sends fails with bad api request', () => {
        distancesSearchWrapper.instance().sendDistancesRequest({"name": "and nothing else"});
        const actualDistances = distancesSearchWrapper.state().distances;
        expect(actualDistances).toEqual([]);
    });

    function mockTourResponse() {
        const responseData = {
            requestType: "distances",
            places: [],
            distances: [500],
            earthRadius: 5000
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }


});
