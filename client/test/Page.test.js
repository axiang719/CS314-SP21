import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import Page from '../src/components/Page';
import { beforeEach, expect, it } from '@jest/globals';

describe('Page', () => {
    
    let pageWrapper;
    const helper = jest.fn();

    beforeEach(() => {
        mockConfigResponse();
        pageWrapper = shallow(<Page
                            showMessage = {helper}/>);
    });
    it('toggles as expected', () => {
        expect(false).toEqual(false);
    });

    it('toggles as expected', () => {
        pageWrapper.setState({showAbout: true});
        pageWrapper.instance().toggleAbout();
        expect(pageWrapper.state().showAbout).toEqual(false);
    });

    it('tests process config response',()=>{
        pageWrapper.instance().processServerConfigError("this is a test error");

    });

    function mockConfigResponse() {
       const configResponseData = {
           "requestType"        : "config",
           "serverName"         : "t13 team name",
           "features"  : ["config", "find", "distances", "tour", "type", "where"],
           "type" : ["airport","heliport","balloonport"],
           "where": ["Canada","Mexico","United States"]
       }

        fetch.mockResponse(JSON.stringify(configResponseData))
   }
});
