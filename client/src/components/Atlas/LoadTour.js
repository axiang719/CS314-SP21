import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Label } from 'reactstrap';

import { isJsonResponseValid as isJsonValid } from "../../utils/restfulAPI";
import * as tourSchema from "../../../schemas/TourResponse";
import { LOG } from '../../utils/constants';

export default class LoadTour extends Component {
    constructor(props) {
		super(props);

        this.renderModal = this.renderModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.processFile = this.processFile.bind(this);

        this.state = {
            modalOpen: false,
            validFile: false,
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
                    {this.renderInput()}                    
                </ModalBody>
            </Modal>
        );
    }

    toggleModal() {
        const { modalOpen } = this.state;
        this.setState({ modalOpen: !modalOpen });
    }

    renderInput() {
        return (
            <Form>
                <FormGroup>
                    <Input 
                        type="file" 
                        name="file" 
                        id="loadFile" 
                        accept=".json, .csv"
                        onChange={this.processFile}/>
                    <FormText color="muted">
                        Provide a .json or .csv file
                    </FormText>
                </FormGroup>
            </Form>
        )
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