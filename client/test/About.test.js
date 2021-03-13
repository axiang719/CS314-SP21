import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';

import About from '../src/components/About/About';
import { beforeEach, expect, it } from '@jest/globals';

describe('About', () => {
    
    let aboutWrapper;

    beforeEach(() => {
        aboutWrapper = shallow(<About/>);
    });

    it('renders as expected', () => {
        expect(aboutWrapper.find('Card')).toHaveLength(6);
        expect(aboutWrapper.find('CardImg')).toHaveLength(5);
    });

});