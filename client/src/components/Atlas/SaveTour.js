import React, { Component } from 'react';
import json2csv, { Parser } from 'json2csv';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';



export default class SaveTour extends Component {
    constructor(props){
        super(props);
        this.convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
        this.jsonToCSV = this.jsonToCSV.bind(this);
      
    }   

    render() {
        return ( 
            <>
                <Button id="Save" color="primary" onClick = {this.convertListOfClicksToString} >Save</Button>  
            </>
        );
    }

    convertListOfClicksToString(){
        let data = [];
        data = this.props.getPlaces();
        console.log(data);
        return data; 
    }

    jsonToCSV(dataArr){
        const fields = dataArr
        const opts = {fields};
        try{
            const parser = new Parser(opts);
            const csv = parser.parse(dataArr);
            console.log(csv);

        } catch(err){
            console.error(err);
        }
    }
 }