import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import { beforeEach, expect, it } from '@jest/globals';
import DistancesSearch from '../src/components/Atlas/DistancesSearch.js';

describe('Distances Search', () => {

    let distancesRequest;

    const request = { requestType: 'distances', 
                    places: [], 
                    earthRadius: 5000 
                };

    beforeEach(() => {
        distancesRequest = new DistancesSearch(request.places, request.earthRadius);
    });

    it('tests get Distances', ()=>{
        expect([]).toEqual(distancesRequest.getDistances());
    });

});
