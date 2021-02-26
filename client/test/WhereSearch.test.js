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
        whereSearchWrapper.state().show = true;
        whereSearchWrapper.update();
    });

    it('initializes as expected', () => {
        const actualWhereValue = whereSearchWrapper.state().whereValue;
        const expectedWhereValue = "";

        expect(whereSearchWrapper.state().show).toEqual(true);
        expect(actualWhereValue).toEqual(expectedWhereValue);
    });
});
