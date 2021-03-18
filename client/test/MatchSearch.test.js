import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import MatchSearch from '../src/components/Atlas/MatchSearch';
import { Button, InputGroup, Input, FormFeedback, Container, Row } from 'reactstrap';
import { beforeEach, expect, it } from '@jest/globals';

describe('MatchSearch', () => {

  let matchSearchWrapper;
  const snacks= jest.fn();
  const request = { requestType: 'find',
                    match : "dave", 
                    type: ["airport"], 
                    where: ["United States"],
                    limit: 1
                };
    
 
    beforeEach(() => {
        mockFindResponse();
        matchSearchWrapper = shallow(<MatchSearch 
                                                setType={["airport"]}
                                                setWhere={["United States"]}
                                                renderDropdown={snacks} 
                                                setMarker={snacks}
                                                showMessage={snacks}
                                                focus={"match"}
                                                match={"dave"}
                                               
                                                
                                                />);
    });
    
        it('initializes as expected', () => {
            const actualSearchType = matchSearchWrapper.state().focus;
            const expectedSearchType = "match";
            expect(actualSearchType).toEqual(expectedSearchType);
        });

        it('toggles the Modal', () => {
            matchSearchWrapper.instance().toggleModal();
            const expectedToggle = true;
            const actualToggle = matchSearchWrapper.state().modalOpen;
            expect(actualToggle).toEqual(expectedToggle);
        });

        it('updates input as expected', () => {
            simulateInput(matchSearchWrapper, "dave");
            expect(matchSearchWrapper.state().findRequest.match).toEqual("dave");
         
        });

        it('set Where as expected', () => {
            matchSearchWrapper.instance().setWhere();
            const expectedWhere = "United States";
            setTimeout( () => {
                const acutalWhere =  matchSearchWrapper.state().findRequest.where;
                expect(acutalWhere).toEqual(expectedWhere);}, 10);
    
        });

        it('set Type as expected', () => {
            matchSearchWrapper.instance().setType();
            const expectedType = "airport";
            setTimeout( () => {
                const acutalType =  matchSearchWrapper.state().findRequest.type;
                expect(acutalType).toEqual(expectedType);}, 10);
    
        });

        it('set processKeyWord',() =>{
            matchSearchWrapper.find("Button").at(0).simulate("click");
        });

        it('set focus', () =>{
            simulateInputFocus(matchSearchWrapper, "match")
            expect(matchSearchWrapper.state().focus).toEqual("match");
           

        });

        it('Sends request to api', () => {
        matchSearchWrapper.instance().sendFindRequest(request);
           matchSearchWrapper.instance().processFindRequestError("bad message");
           simulateInput(matchSearchWrapper,"bad Input");
           expect(matchSearchWrapper.state().findRequest.match).toEqual(null);

            setTimeout( () => {
                const actualFocus= matchSearchWrapper.state().focus;
                expect(actualFocus).toEqual("match");}, 10);
              
        });

        function simulateInput(wrapper, input) {
            wrapper.find('Input').at(0).simulate('change', { target: { value: input } });
            wrapper.update();
        };

        function simulateInputFocus(wrapper, match){
            
            wrapper.find('Input').at(0).simulate('focus',{target: {value: match}});
        };
        
        function mockFindResponse() {
            const responseData = {
                    match: "dave",
                    limit: 1,
                    found: 18,
                    places: [
                        {
                            "continent": "North America",
                            "altitude": "5170",
                            "country": "United States",
                            "latitude": "40.0332984924",
                            "name": "Dave's Airport",
                            "municipality": "Louisville",
                            "type": "small_airport",
                            "region": "Colorado",
                            "longitude": "-105.124000549"
                        }],
                    
                    type: ["airport"],
                    where: ["United States"],
                    requestType: "find"
                 };
            fetch.mockResponse(JSON.stringify(responseData));
        }
    
  


});