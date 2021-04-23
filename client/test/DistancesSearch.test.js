import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import { beforeEach, expect, it } from '@jest/globals';
import DistancesSearch from '../src/components/Atlas/DistancesSearch.js';

describe('Distances Search', () => {

    let distancesRequest;

    const request = { requestType: 'distances', 
                    places: [], 
                    earthRadius: 5000, 
                    distances: [1000]
                };

    beforeEach(() => {
        distancesRequest = new DistancesSearch(request.places, request.earthRadius);
    });

    it('tests get Distances', ()=>{
        const mock = mockDistancesResponse();
        const response = distancesRequest.sendDistancesRequest("8000");
        expect([]).toEqual(distancesRequest.getDistances());
        // expect(response.distances).toEqual(distancesRequest.getSumDistances());

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

    function badMockDistancesResponse(){
        
    }

});
