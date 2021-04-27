import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';

import React from 'react';
import MatchSearch from '../src/components/Atlas/MatchSearch';
import TypeSearch from '../src/components/Atlas/TypeSearch';
import WhereSearch from '../src/components/Atlas/WhereSearch';
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
    const checkForFeature = function() {
        return true;
    }
 
    beforeEach(() => {
        mockFindResponse();
        matchSearchWrapper = shallow(<MatchSearch 
                                                setType={["airport"]}
                                                setWhere={["United States"]}
                                                checkForFeature={checkForFeature}
                                                inputText ={""}
                                                setMarker={snacks}
                                                showMessage={snacks}
                                                match={"dave"}
                                                serverSettings={{
                                                    'serverConfig': {
                                                        'requestType': 'config', 
                                                        'serverName': 't99',
                                                        "features"  : ['config', 
                                                                        'find', 
                                                                        'distances', 
                                                                        'tour', 
                                                                        'type', 
                                                                        'where']},
                                                    'serverPort': 'http://localhost:8000'}}
                                                />);
    });
    
        it('initializes as expected', () => {
            const actualList = matchSearchWrapper.state().listOfMatches;
            const expectedList = [];
            
            expect(actualList).toEqual(expectedList);
        });

        it('toggles the Modal', () => {
            matchSearchWrapper.instance().toggleModal();
            const expectedToggle = true;
            const actualToggle = matchSearchWrapper.state().modalOpen;
            expect(actualToggle).toEqual(expectedToggle);
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

        it('Sends request to api', () => {
            matchSearchWrapper.instance().processFindRequestError("bad message");
            matchSearchWrapper.setProps({inputText: "dave"});
            matchSearchWrapper.find("Button").at(0).simulate("click");

            expect(matchSearchWrapper.state().findRequest.match).toEqual("dave");        
        });

        it('renders type and where conditionally', () => {
            const typeLen = matchSearchWrapper.find(TypeSearch).length;
            const whereLen = matchSearchWrapper.find(WhereSearch).length;
            const expectedLen = 1;

            expect(typeLen).toEqual(expectedLen);
            expect(whereLen).toEqual(expectedLen);

            matchSearchWrapper.setProps( { checkForFeature: function() {
                return false;
            } } );

            const newTypeLen = matchSearchWrapper.find(TypeSearch).length;
            const newWhereLen = matchSearchWrapper.find(WhereSearch).length;
            const newExpLen = 0;

            expect(newTypeLen).toEqual(newExpLen);
            expect(newWhereLen).toEqual(newExpLen);
        });

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