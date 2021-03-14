import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import MatchSearch from '../src/components/Atlas/MatchSearch';
import { Button, InputGroup, Input, FormFeedback, Container, Row } from 'reactstrap';
import { beforeEach, expect, it } from '@jest/globals';

describe('MatchSearch', () => {

  let matchSearchWrapper;
  const createSnackBar = jest.fn();

    beforeEach(() => {
      matchSearchWrapper = shallow(<MatchSearch match = {createSnackBar} />);
    });
    
        it('initializes as expected', () => {
            simulateOnClickEvent(matchSearchWrapper);
                setTimeout( () => {
                    
                    const actualSearchType = matchSearchWrapper.state().focus;
                    const expectedSearchType = "match";
                    expect(actualSearchType).toEqual(expectedSearchType);}, 10);
                });

        it('updates input as expected', () => {
            simulateInput(matchSearchWrapper, "pickle");
            expect(matchSearchWrapper.state().findRequest.match).toEqual("pickle");
        });
    
        function simulateInput(wrapper, input) {
            wrapper.find('Input').at(0).simulate('change', { target: { value: input } });
            wrapper.update();
        };
        
        function simulateOnClickEvent(wrapper) {
            wrapper.find('button').at(0).simulate('click');
            wrapper.update();
        };

  


});