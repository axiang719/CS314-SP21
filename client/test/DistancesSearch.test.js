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
                    earthRadius: 5000 };


    beforeEach(() => {
        mockDistancesResponse();
        distancesSearchWrapper = shallow(<DistancesSearch
                                            showMessage = {showMessage}
                                        />);
        console.log(distancesSearchWrapper);
    });

});
