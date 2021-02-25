import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import {Marker} from 'react-leaflet';
import Atlas from '../src/components/Atlas/Atlas';

describe('Atlas', () => {
    const createSnackBar = jest.fn();
    let atlasWrapper;
    let reverseWrapper;

    beforeEach(() => {
        atlasWrapper = shallow(<Atlas createSnackBar={createSnackBar}/>);
    });

    it('initializes as expected', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
    });

    it('renders a marker on click', () => {
        const actualMarkerPosition = atlasWrapper.state().markerPosition;
        const expectedMarkerPosition = null;

        expect(actualMarkerPosition).toEqual(expectedMarkerPosition);

        const clickPosition = {lat: 0, lng: 0};
        simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});

        expect(atlasWrapper.state().markerPosition).toEqual(clickPosition);
        expect(atlasWrapper.find(Marker).length).toEqual(1);
    });
    
    it('reverse geocoding', () => {
          const testString = null;
          const expectedString = null;
          const postion = {lat:40.576099, lng: -105.080901};
          expectedString = reverseGeoCoding(postion);
          expect(expectedString != testString);
    });
    

    function simulateOnClickEvent(wrapper, event) {
        wrapper.find('Map').at(0).simulate('click', event);
        wrapper.update();
    }
});