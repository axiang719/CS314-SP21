import React, { Component } from 'react';

import { Button } from 'reactstrap';

import TourRequest from "./TourRequest"



export default class OrderTour extends Component {

    constructor(props){
        super(props);
        
        this.handleShortTourClick = this.handleShortTourClick.bind(this);
    }

    render() {
        return ( 
            <>
                <Button onClick={this.handleShortTourClick} color="primary">Order</Button>  
            </>
        );
    }

     async handleShortTourClick() {
        const length = this.props.listOfClicks.length
        if (length >= 2) {
            const oldList = [];
            for (let i = 0; i < length; i++) {
                const place = {
                    name: this.props.listOfClicks[i].name,
                    latitude: this.props.listOfClicks[i].latitude.toString(),
                    longitude: this.props.listOfClicks[i].longitude.toString()
                }
                oldList.unshift(place)
            }
            const i = new TourRequest(oldList,3539);
            await i.sendRequest();
            const newList = i.getPlaces();
            this.props.setTour(newList);
        }
    }
    
}