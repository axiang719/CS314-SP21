import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Label } from 'reactstrap';

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
                    <Label for="loadFile">Load Tour</Label>
                    <Input 
                        type="file" 
                        name="file" 
                        id="loadFile" 
                        accept=".json, .csv"
                        valid={this.state.validFile}
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
        console.log(fileType);

        if (fileType.includes(".json")) {
            this.setState({validFile: true, fileType: ".json"})
        }
        else if (fileType.includes(".csv")) {
            this.setState({validFile: true, fileType: ".csv"})
        }
        else {
            this.setState({validFile: false, fileType: ""})
        }
    }
}