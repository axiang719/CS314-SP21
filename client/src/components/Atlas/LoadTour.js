import React, { Component } from 'react';

import XLSX from "xlsx";

import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Row, Col } from 'reactstrap';
import { isJsonResponseValid as isJsonFileValid } from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TripFile";



export default class LoadTour extends Component {
    constructor(props) {
		super(props);

        this.renderModal = this.renderModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderUploadForm =this.renderUploadForm.bind(this);
        this.renderFormInput = this.renderFormInput.bind(this);
        this.renderFormButton = this.renderFormButton.bind(this);
        this.addTourToMap = this.addTourToMap.bind(this);
        this.processFile = this.processFile.bind(this);
        this.uploadJsonFile = this.uploadJsonFile.bind(this);
        this.checkTour = this.checkTour.bind(this);
        this.isTourValid = this.isTourValid.bind(this);
        this.uploadCsvFile = this.uploadCsvFile.bind(this);
        this.csvOnload = this.csvOnload.bind(this);
        this.jsonOnload = this.jsonOnload.bind(this);
        this.csvToJsonFormat = this.csvToJsonFormat.bind(this);
       
        this.state = {
            modalOpen: false,
            validFile: false,
            fileType: "",
            tourUpload: [],
            validTour: null
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
        this.setState({ modalOpen: !modalOpen, validTour: null });
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
                        color="primary"
                        onClick={this.addTourToMap}>
                        Add
                </Button>
            </div>
        );
    }

    addTourToMap() {
        const { tourUpload } = this.state;
        const places = tourUpload.places;
        this.props.clearList();
        for(let i=0; i < places.length; i++) {
            const place = places[i];
            const latitude = parseFloat(place.latitude);
            const longitude = parseFloat(place.longitude);
            const latLng = {lat: latitude, lng: longitude}
            this.props.setPlace(latLng);
        }
    }

    processFile(e) {
        const files = e.target.files, file = files[0];
        const fileType = file.name;
        const regex = /^.*\.json|csv$/
        const fileIsValid = fileType.match(regex);
        if (fileType.includes(".json") && fileIsValid) {
                this.setState({validFile: true, fileType: ".json"});
                this.uploadJsonFile(e);
        }
        else if (fileType.includes(".csv") && fileIsValid) {
            this.setState({validFile: true, fileType: ".csv"});
            this.uploadCsvFile(e);
        }
       
        else {
            this.setState({validFile: false, fileType: ""});
        }
    }

    uploadJsonFile(e){
            try{
                const files = e.target.files, file = files[0];
                let reader = new FileReader();

                reader.onload = (e) => this.jsonOnload(e);
                reader.readAsText(file);
            }catch (error) {
                console.error(error);
        }
    }

    jsonOnload(e) {
        let jsonData = JSON.parse(e.target.result);         
        this.checkTour(jsonData);
    }


    uploadCsvFile(e){
        try {
            const files = e.target.files, file = files[0];
            let reader = new FileReader();
        
            reader.onload = (e) => this.csvOnload(e);
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error(error);
        }
    }

    csvOnload(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'})
        let json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
            defval: "",
        });
        let jsonObj = this.csvToJsonFormat(json); 
        this.checkTour(jsonObj);
    }

    csvToJsonFormat(jsonArr){
        let jsonObj ={};
        for(let i = 0; i < jsonArr.length; i++){
            const place = jsonArr[i];
        }
            

    }

    parsePlace(jsonObj){
        let placeDetails ={};
        for(let key in place){
            const value = place[key];
            if(key == "earthRadius"){
                jsonObj[key] = value;
            }
        }
    }
    

   

    checkTour(tourObject) {
        if (this.isTourValid(tourObject)) {
            this.setState({tourUpload: tourObject, validTour: true});
        } else {
            this.setState({validTour: false})
        }
    }

    isTourValid(tourArray) {
        return isJsonFileValid(tourArray, tripSchema)
    }
}
    
