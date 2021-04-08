import React, { Component } from 'react';
import XLSX from "xlsx";
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';



export default class SaveTour extends Component {
    constructor(props){
        super(props);
        this.convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
      
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
        this.exportCSV(data);
        console.log(data);
     
        }

        exportCSV(csvExport){
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(csvExport)
            XLSX.utils.book_append_sheet(wb, ws, "info")
            const wopts = {
                bookType: 'csv',
                bookSST: false,
                type: 'buffer'
            };
            const wbout = XLSX.writeFile(wb, "output.csv" ,wopts);
        }
}

 
 