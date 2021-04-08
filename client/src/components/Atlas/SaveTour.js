import React, { Component } from 'react';
import XLSX from "xlsx";
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';
import { downloadFile } from '../../utils/restfulAPI';



export default class SaveTour extends Component {
    constructor(props){
        super(props);
        this.convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        // this.exportJSON = this.exportJSON.bind(this);
      
    }   

    render() {
        return ( 
            <>
                <Button id="Save" color="primary" onClick = {this.exportJSON} >Save</Button>  
            </>
        );
    }

    convertListOfClicksToString(){
        let data = [];
        data = this.props.getPlaces();
        return data;
        // this.exportCSV(data);
    }

    exportCSV(){
        let data = this.convertListOfClicksToString();
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, "info")
        const wopts = {
            bookType: 'csv',
            bookSST: false,
            type: 'buffer'
        };
        const wbout = XLSX.writeFile(wb, "output.csv" ,wopts);
    }

}

 
 