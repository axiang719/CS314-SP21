import React, { Component } from 'react';
import XLSX from "xlsx";
import { Button, Modal, ModalHeader, ModalBody, DropdownItem } from 'reactstrap';
import { downloadFile } from '../../utils/restfulAPI';

export default class SaveTour extends Component {
    constructor(props){
        super(props);
        this.convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
        this.exportCSV = this.exportCSV.bind(this);

        this.exportJSON = this.exportJSON.bind(this);
	    this.toggleModal = this.toggleModal.bind(this);

      
	    this.state = {
	        modalOpen: false
	    }
    }   
        
    render() {
        return (
            <>
                <DropdownItem id="Save" color="primary" onClick={this.toggleModal}>Save</DropdownItem>
                {this.renderModal()}
            </>
        );
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    <div className="text-center">Save Tour</div>
                </ModalHeader>
                <ModalBody>
                	<Button id="SaveCSV" color="primary" className = 'mr-1' onClick={this.exportCSV}>Save as CSV</Button>  
                    <Button id="SaveJSON" color="primary" onClick={this.exportJSON}>Save as JSON</Button> 
                </ModalBody>
            </Modal>
        );
    }

    toggleModal() {
        const { modalOpen } = this.state;
        this.setState({ modalOpen: !modalOpen, validTour: null });
    }


    convertListOfClicksToString(){
        let data = [];
        data = this.props.getPlaces();
        return data;
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
        const wbout = XLSX.writeFile(wb, "trip.csv" ,wopts);
    }
    exportJSON(){
        let data = {places: this.convertListOfClicksToString()};
        data = JSON.stringify(data);
        downloadFile(data, 'trip.json','application/json');
    }
}

 
 
