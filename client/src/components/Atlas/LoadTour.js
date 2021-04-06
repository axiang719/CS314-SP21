import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Form, FormGroup, FormText, Label } from 'reactstrap';
import XLSX from "xlsx";

export default class LoadTour extends Component {
    constructor(props) {
		super(props);

        this.renderModal = this.renderModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.processFile = this.processFile.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            modalOpen: false,
            validFile: false,
            fileType: "",
            tourUpload: []
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

    processFile(e) {
        const files = e.target.files, file = files[0];
        const fileType = file.name;
        const regex = /^.*\.json|csv$/
        const fileIsValid = fileType.match(regex);
       if (fileType.includes(".json") && fileIsValid) {
            this.setState({validFile: true, fileType: ".json"})
        }
       else if (fileType.includes(".csv") && fileIsValid) {
            this.setState({validFile: true, fileType: ".csv"})
            this.upload(e);
         }
       
        else {
            this.setState({validFile: false, fileType: ""})
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
}