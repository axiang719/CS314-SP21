import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import { beforeEach, expect, it } from '@jest/globals';
import DistancesSearch from '../src/components/Atlas/DistancesSearch.js';

describe('Distances Search', () => {

    let distancesSearchWrapper;
    
    const showMessage = jest.fn();
    const request = { requestType: 'distances', 
                    places: [], 
                    earthRadius: 5000 }


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


    function mockDistancesResponse() {
        const responseData = {
            requestType: "distances",
            places: [],
            distances: [500],
            earthRadius: 5000
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }


});