import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import {Marker} from 'react-leaflet';
import WhereSearch from '../src/components/Atlas/WhereSearch';
import { it } from '@jest/globals';

describe('WhereSearch', () => {
    let whereSearchWrapper;
    const helper = jest.fn();
    const whereArray = ["Osaka","Kyoto"];

    beforeEach(() => {
        whereSearchWrapper = shallow(<WhereSearch where = {whereArray}
                                                  whereType = {helper}
                                                  processFocus = {helper}
                                                  setWhere = {helper}/>);
        whereSearchWrapper.setState({show : true});
        whereSearchWrapper.setState({whereValue : "tokyo"});
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

        expect(whereSearchWrapper.state().show).toEqual(false);
    });

    it('checks the where array buttons work', () => {
        whereSearchWrapper.find(Input).at(0).simulate('change', { target: { value: "osaka" } });
        whereSearchWrapper.find(Input).at(0).simulate('focus', { target: { value: "osaka" } });
        whereSearchWrapper.update();

        expect(whereSearchWrapper.state().whereValue).toEqual("osaka");
    });    

    it ('test',()=>{
        whereSearchWrapper.find('Button').at(2).simulate('click');
    })
});
