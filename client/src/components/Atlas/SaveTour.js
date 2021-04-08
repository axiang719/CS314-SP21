import React, { Component } from 'react';
import XLSX from "xlsx";
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';

export default class SaveTour extends Component {
    constructor(props){
        super(props);
        this.convertListOfClicksToString = this.convertListOfClicksToString.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
	this.toggleModal = this.toggleModal.bind(this);
      
	this.state = {
	    modalOpen: false
	}
    }   
        
    render() {
        return (
            <>
                <Button id="Save" color="primary" onClick={this.toggleModal}>Save</Button>
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
                	<Button id="SaveCSV" color="primary" onClick={this.convertListOfClicksToString}>Save as CSV</Button>  
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
        this.exportCSV(data);
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

 
 
