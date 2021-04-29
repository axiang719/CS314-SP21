import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, ModalHeader, ModalBody, UncontrolledPopover} from 'reactstrap';
import PlacesList from '../src/components/Atlas/PlacesList';
import { expect, it } from '@jest/globals';

describe('PlacesList', () => {
    let placesWrapper;
    const listOfMatches = [
        {
            "altitude": "700",
            "country": "United States",
            "latitude": "40.66680145263672",
            "name": "Schadels Airport",
            "municipality": "Klingerstown",
            "type": "small_airport",
            "region": "Pennsylvania",
            "longitude": "-76.68299865722656"
        }];
    
    const buttonHandler = jest.fn();


    beforeEach(() => {
       placesWrapper = shallow(<PlacesList  modalOpden = {true} 
                                            listOfMatches = {listOfMatches}
                                            setMarker = {buttonHandler}
                                            toggleModal = {buttonHandler}/>); 
    });
    it('please run', ()=>{

    });

    it('initializes as expected', () => {
        expect(placesWrapper.find(ModalHeader)).toHaveLength(1);
        expect(placesWrapper.find(ModalBody)).toHaveLength(1);
        expect(placesWrapper.find('Row')).toHaveLength(1);
    });

    it('contains a popover and two buttons', () => {
        expect(placesWrapper.find(UncontrolledPopover)).toHaveLength(1);
        expect(placesWrapper.find(Button)).toHaveLength(2);
    });

    // it('renders a marker on click', () => {
    //     const clickPosition = {lat: 0, lng: 0};
    //     simulateOnClickEvent(atlasWrapper, {latlng: clickPosition});

    //     expect(atlasWrapper.state().markerPosition).toEqual(clickPosition);
    //     expect(atlasWrapper.find(Marker).length).toEqual(1);
    // });
});