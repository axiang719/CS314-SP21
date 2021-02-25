import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, InputGroup } from 'reactstrap';
import {Marker} from 'react-leaflet';
import WhereSearch from '../src/components/Atlas/WhereSearch';

describe('WhereSearch', () => {
    let whereSearchWrapper;

    beforeEach(() => {
        whereSearchWrapper = shallow(<WhereSearch/>);
    });

    it('initializes as expected', () => {
        const actualWhereValue = whereSearchWrapper.state().whereValue;
        const expectedWhereValue = "";

        expect(actualWhereValue).toEqual(expectedWhereValue);
    });

    it('renders InputGroup', () => {
        whereSearchWrapper.state().show = true;
        expect(whereSearchWrapper.state().show).toEqual(true);
        expect(whereSearchWrapper.contains(<InputGroup/>)).toEqual(true);
    });
        
    it('renders Buttons', () => {
        whereSearchWrapper.state().show = true;
        expect(whereSearchWrapper.contains(<Button/>)).toEqual(true);
    });

    it('updates where', () => {
        whereSearchWrapper.state().show = true;
        const event = {target: {name: "testChange", value: "test"}};
        simulateOnChangeEvent(whereSearchWrapper, event);

        const actualWhereValue = whereSearchWrapper.state().whereValue;
        expect(actualWhereValue).toEqual("test");
    });

    function simulateOnChangeEvent(wrapper, event) {
        wrapper.update();
        wrapper.find('Input').at(0).simulate('change', event);
    }
});
