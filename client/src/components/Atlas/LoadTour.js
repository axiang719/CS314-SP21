import React, { Component } from 'react';

import XLSX from "xlsx";

import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';


export default class LoadTour extends Component {
    constructor(props) {
		super(props);

        this.renderModal = this.renderModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderUploadForm =this.renderUploadForm.bind(this);
        this.renderFormInput = this.renderFormInput.bind(this);
        this.renderFormButton = this.renderFormButton.bind(this);
        this.processFile = this.processFile.bind(this);
        this.uploadJsonFile = this.uploadJsonFile.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            modalOpen: false,
            validFile: false,
            fileType: "",
            tourUpload: [],
            validTour: null,
            fileType: ""
        }
    }
    
    render() {
        return ( 
            <>
                <Button color="primary" onClick={this.toggleModal}>Load</Button>
                {this.renderModal()}
                
            </>
        );
    }
    
    renderModal() {
        return (
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    <div className="text-center">Load Tour</div>
                </ModalHeader>
                <ModalBody>
                    {this.renderUploadForm()}                    
                </ModalBody>
            </Modal>
        );
    }

    toggleModal() {
        const { modalOpen } = this.state;
        this.setState({ modalOpen: !modalOpen });
    }

    renderUploadForm() {
        return (
            <Form>
                <FormGroup>
                    <Row xs="2">
                        <Col xs="9">
                            {this.renderFormInput()}
                        </Col>
                        <Col xs="3">
                            {this.renderFormButton()}
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        )
    }

    renderFormInput() {
        const { validTour } = this.state;
        return (
            <>
                <Input 
                    type="file" 
                    name="file" 
                    id="loadFile" 
                    accept=".json, .csv"
                    onChange={this.processFile}/>
                <FormText color={validTour === false ? "danger" : "muted"}>
                    {validTour === false && "This file does not contain a valid tour!"}                       
                    {validTour !== false && "Provide a .json or .csv file"}
                </FormText>
            </>
        );
    }

    renderFormButton() {
        const { validTour, validFile } = this.state;
        return ( 
            <div className="text-right">
                <Button disabled={!validFile || !validTour} 
                        size="small" 
                        color="primary">
                        Add
                </Button>
            </div>
        );
    }

    processFile(e) {
        const files = e.target.files, file = files[0];
        const fileType = file.name;
        const regex = /^.*\.JSON|csv$/
        const fileIsValid = fileType.match(regex);
       if (fileType.includes(".JSON") && fileIsValid) {
            this.setState({validFile: true, fileType: ".JSON"});
            this.uploadJsonFile(e);
        }
       else if (fileType.includes(".csv") && fileIsValid) {
            this.setState({validFile: true, fileType: ".csv"});
            this.upload(e);
         }
       
        else {
            this.setState({validFile: false, fileType: ""});
        }
    }

    uploadJsonFile(e){
        let jsonRows =[];
            try{
                const files = e.target.files, file = files[0];
                let reader = new FileReader();
                reader.onload = function(e) {
                    let data = JSON.parse(e.target.result);
                    console.log(data);
                };
                reader.readAsText(file);
            }catch (error) {
                console.error(error);
        }
    }


    upload(e){
        let jsonRows = [];
            try {
                const files = e.target.files, file = files[0];
                let reader = new FileReader();
                reader.onload = (e) => {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, {type: 'array'})
                    jsonRows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
                        defval: "",
                    });
                    this.setState({tourUpload: jsonRows});
                    console.log(this.state.tourUpload);
                }
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error(error);
            }
    }

    isTourValid(tourArray) {
        const LngRegex = /^[-+]?(?:180(?:(?:\.0+)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]+)?))$/;
        const LatRegex = /^[-+]?(?:90(?:(?:\.0+)?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]+)?))$/;
        for (let i = 0; i < tourArray.length; i++) {
            const place = tourArray[i];
            const latitude = place.latitude;
            const longitude = place.longitude;
            if (latitude == null || longitude == null ||
                !latitude.match(LatRegex) || !longitude.match(LngRegex)) {
                return false;
            }
        }
        return true;
    }
}
    
