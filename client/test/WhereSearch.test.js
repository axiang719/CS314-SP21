import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, InputGroup } from 'reactstrap';
import {Marker} from 'react-leaflet';
import WhereSearch from '../src/components/Atlas/WhereSearch';
import { it } from '@jest/globals';

describe('WhereSearch', () => {
    let whereSearchWrapper;
    const helper = jest.fn();
    const whereArray = ["Osaka","Kyoto","Denver"];

    beforeEach(() => {
        whereSearchWrapper = shallow(<WhereSearch where = {whereArray}
                                                  whereType = {helper}
                                                  processFocus = {helper}
                                                  setWhere = {helper}/>);
        whereSearchWrapper.state().show = true;
        whereSearchWrapper.state().whereValue = "tokyo";
        whereSearchWrapper.update();
    });

    it('initializes as expected', () => {
        const actualWhereValue = whereSearchWrapper.state().whereValue;
        const expectedWhereValue = "tokyo";

        expect(whereSearchWrapper.state().show).toEqual(true);
        expect(actualWhereValue).toEqual(expectedWhereValue);
    });
   
    it('tests processOnClickWhere function',() => {
        const actualWhereValue = whereSearchWrapper.state().whereValue;
        const expectedWhereValue = "tokyo";
        
        whereSearchWrapper.instance().processOnClickWhere();
        expect(actualWhereValue).toEqual(expectedWhereValue);
    });

    it('checks the where button works', () => {
        whereSearchWrapper.find('Button').at(0).simulate('click');
        whereSearchWrapper.update();

        expect(whereSearchWrapper.state().show).toEqual(true);
    });


    


});
