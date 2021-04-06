import React, { Component } from 'react';
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

        this.state = {
            modalOpen: false,
            validFile: false,
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

    processFile(onChangeEvent) {
        const fileType = onChangeEvent.target.value;
        const regex = /^.*\.json|csv$/
        const fileIsValid = fileType.match(regex);

        if (fileType.includes(".json") && fileIsValid) {
            this.setState({validFile: true, fileType: ".json"})
        }
        else if (fileType.includes(".csv") && fileIsValid) {
            this.setState({validFile: true, fileType: ".csv"})
        }
        else {
            this.setState({validFile: false, fileType: ""})
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