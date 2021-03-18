import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import Page from '../src/components/Page';
import { beforeEach, expect, it } from '@jest/globals';

describe('Page', () => {
    
    let pageWrapper;

    beforeEach(() => {
        pageWrapper = shallow(<Page/>);
    });

    it('toggles as expected', () => {
        pageWrapper.setState({showAbout: true});
        pageWrapper.instance().toggleAbout();
        expect(pageWrapper.state().showAbout).toEqual(false);
    });
});