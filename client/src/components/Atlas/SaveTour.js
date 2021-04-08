import React, { Component } from 'react';
import json2csv from 'json2csv';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';



export default class SaveTour extends Component {

    constructor(props){
        super(props);
        this. convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
       
    }   

    render() {
        return ( 
            <>
                <Button id="Save" color="primary" >Save</Button>  
            </>
        );
    }

    convertListOfClicksToString(){
        const listOfClicks = this.props.listOfClicks;
        let data = [];
        for(let i = 0; i < listOfClicks.length; i++){
            const place = {
                latitude: listOfClicks[i].latitude.toString(),
                longitude: listOfClicks[i].longitude.toString()
            }
            data.push(place);
        }
        return data; 
    }
 }