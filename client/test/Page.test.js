import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import Page from '../src/components/Page';
import { beforeEach, expect, it } from '@jest/globals';

describe('Page', () => {
    
    let pageWrapper;
    const helper = jest.fn();

    beforeEach(() => {
        pageWrapper = shallow(<Page
                            showMessage = {helper}/>);
    });

    it('toggles as expected', () => {
        pageWrapper.setState({showAbout: true});
        pageWrapper.instance().toggleAbout();
        expect(pageWrapper.state().showAbout).toEqual(false);
    });

    it('tests process config response',()=>{
        pageWrapper.instance().processServerConfigError("this is a test error");

    });
});