import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import { beforeEach, expect, it } from '@jest/globals';
import DistancesSearch from '../src/components/Atlas/DistancesSearch.js';

describe('Distances Search', () => {

    let distancesRequest;

    const request = { requestType: 'distances', 
                    places: [], 
                    earthRadius: 5000, 
                };
    const distances = [500, 1000];

    beforeEach(() => {
        distancesRequest = new DistancesSearch(request.places, request.earthRadius, distances);
    });

    it('tests get Distances', ()=>{
        const mock = mockDistancesResponse();
        const response = distancesRequest.sendDistancesRequest("8000");
        distancesRequest.setDistances();
        expect([500,1000]).toEqual(distancesRequest.getDistances());
        distancesRequest.getSumDistances();
    });

    it('tests bad response', ()=>{
        const mock = badMockDistancesResponse();
        const response = distancesRequest.processDistancesResponse(mock);
    });

    function mockDistancesResponse() {
        const responseData = {
            requestType: "distances",
            places: [],
            distances: [500,1000],
            earthRadius: 5000
        };
        fetch.mockResponse(JSON.stringify(responseData));
    }

    function badMockDistancesResponse(){
        const badResponse = {
            request: "Tokyo"
        }
    }

});
