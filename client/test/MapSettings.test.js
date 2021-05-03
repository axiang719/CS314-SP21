import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker, Polyline} from 'react-leaflet';
import MapSettings from '../src/components/Atlas/MapSettings';
import { afterEach, expect, it, jest, toEqual } from '@jest/globals';

describe('MapSettings', () => {
    const snacks = jest.fn();
    let mapWrapper;

    beforeEach(() => {
        mapWrapper = shallow(<MapSettings rgbCallback = {snacks}
                                            value = {snacks}/>)
    });

    it('tests state', ()=>{
        mapWrapper.setState({color: '#11a1e8'});
        expect(mapWrapper.state().color).toEqual('#11a1e8');
    });

    it('tests the modal toggle',()=>{
        const mockEvent = {
            target: jest.fn(),
            value: '#11a1e8'
        };
        mapWrapper.setState({modalOpen: true});
        mapWrapper.instance().toggleModal();
        mapWrapper.instance().handleChange(mockEvent);
        expect(mapWrapper.state().modalOpen).toEqual(false);
    });
});