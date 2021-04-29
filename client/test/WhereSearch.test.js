import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import {Marker} from 'react-leaflet';
import WhereSearch from '../src/components/Atlas/WhereSearch';
import { expect, it, toHaveBeenCalled } from '@jest/globals';

describe('WhereSearch', () => {
    let whereSearchWrapper;
    const helper = jest.fn();
    const whereArray = ["Osaka","Kyoto"];
    const serverSettings = {
        serverConfig: {
            where: ["place1", "place2", "place3"]
        }
    } 

    beforeEach(() => {
        whereSearchWrapper = shallow(<WhereSearch where = {whereArray}
                                                  whereType = {helper}
                                                  processFocus = {helper}
                                                  setWhere = {helper}
                                                  serverSettings = {serverSettings}/>);
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
   
    it('tests processOnChangeWhere function',() => {
        const whereValue = "tokyo";
        
        whereSearchWrapper.instance().processOnChangeWhere(whereValue);
        expect(helper).toHaveBeenCalled()
    });

    it ('test',()=>{
        whereSearchWrapper.find('Button').at(2).simulate('click');
        const expectedWhere = "tokyo";

        expect(expectedWhere).toEqual(whereSearchWrapper.state().whereValue);

    })
});
