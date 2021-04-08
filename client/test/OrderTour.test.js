import './jestConfig/enzyme.config.js';
import {shallow} from 'enzyme';
import React, { Component } from 'react';
import OrderTour from '../src/components/Atlas/OrderTour';
import { expect, it, toHaveBeenCalled } from '@jest/globals';

let orderTourWrapper;
const setTour = jest.fn();
let list = [
    {"name":"Fort Collins", "latitude": "40.55", "longitude": "-105.06", "notes":"Place 1"},
    {"name":"China",        "latitude": "37.77", "longitude": "106.32",  "notes":"Place 2"},
    {"name":"Denver",       "latitude": "39.74", "longitude": "-104.99", "notes":"Place 3"},
    {"name":"Also China",   "latitude": "37.71", "longitude": "106.33",  "notes":"Place 4"},
    {"name":"Wyoming",      "latitude": "43.07", "longitude": "107.29",  "notes":"Place 5"}
];

beforeEach(() => {
    orderTourWrapper = shallow(<OrderTour
                                    setTour = {setTour()}
                                    listOfClicks = {list}
                                />);
});

it('shortens the tour on button click', () => {
    const shorterList = [{"name":"Fort Collins", "latitude": "40.55", "longitude": "-105.06", "notes":"Place 1"}];
    mockTourResponse();
    orderTourWrapper.find('Button').simulate('click');
    orderTourWrapper.setProps({ listOfClicks: shorterList }) 
    orderTourWrapper.find('Button').simulate('click');
    expect(setTour).toHaveBeenCalled();
});

function mockTourResponse() {
    const distResponseData = {
        "requestType"    : "tour", 
        "earthRadius"    : 3959.0,
        "response": 1,
        "places"         : [{"name":"Fort Collins", "latitude": "40.55", "longitude": "-105.06", "notes":"Place 1"},
                            {"name":"China",        "latitude": "37.77", "longitude": "106.32",  "notes":"Place 2"},
                            {"name":"Denver",       "latitude": "39.74", "longitude": "-104.99", "notes":"Place 3"},
                            {"name":"Also China",   "latitude": "37.71", "longitude": "106.33",  "notes":"Place 4"},
                            {"name":"Wyoming",      "latitude": "43.07", "longitude": "107.29",  "notes":"Place 5"}]
        }

     fetch.mockResponse(JSON.stringify(distResponseData))
}
