import React, { Component } from 'react';

import { Button, DropdownItem } from 'reactstrap';

import TourRequest from "./TourRequest"

import {FaRoute } from "react-icons/fa" 




export default class OrderTour extends Component {

    constructor(props){
        super(props);
        
        this.handleShortTourClick = this.handleShortTourClick.bind(this);
    }

    render() {
        return ( 
            <>
                <DropdownItem onClick={this.handleShortTourClick} color="primary">
                    Optimize <FaRoute className="float-right"/>
                </DropdownItem>
            </>
        );
    }

     async handleShortTourClick() {
        const length = this.props.listOfClicks.length
        if (length >= 2) {
            const oldList = this.props.getPlaces();
            const i = new TourRequest(oldList,3539);
            await i.sendRequest(this.props.serverSettings.serverPort);
            const newList = i.getPlaces();
            this.props.setTour(newList);
        }
    }
    
}