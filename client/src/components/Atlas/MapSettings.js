import React, { Component } from 'react';
import { Col, Container, Row, Button, Table, Modal, ModalHeader, ModalBody, FormGroup, Input, Label} from 'reactstrap';
import { BsGearFill } from "react-icons/bs"

export default class MapSettings extends Component {
    constructor(props) {

        super(props);
        this.toggleModal= this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.renderMapSettingButton = this.renderMapSettingButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBar = this.handleChangeBar.bind(this);
        this.renderLineWidthForm = this.renderLineWidthForm.bind(this);

        this.state = {
            modalOpen: false,
            color: '#11a1e8',
            lineWidth: 10
        };
    }

    render(){
        return(
            this.renderMapSettingButton()
        );
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    <div className="text-center">Map Settings</div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for= {this.state.color}>Color</Label>
                            <Input
                                type = 'color'
                                name = {this.state.color}
                                id = 'name'
                                placeholder = {this.state.color}
                                value = {this.state.color}
                                background-color = {this.state.color}
                                onChange = {this.handleChange}
                            />
                    </FormGroup>  
                    {this.renderLineWidthForm()}      
                </ModalBody>
            </Modal>
        );
    }

    renderMapSettingButton(){
        return(
            <>
                <Button onClick = {this.toggleModal} id = "lines" size = "sm" color = "primary"><BsGearFill/></Button>
                <Col>{this.renderModal()}</Col>
            </>
        );
    }

    renderLineWidthForm(){
        return(
            <>
                <FormGroup>
                    <Label for="exampleRange">Line Width</Label>
                    <Input type="range" 
                            name="range" 
                            id="exampleRange" 
                            onChange = {this.handleChangeBar}/>
                </FormGroup>    
            </>
        );
    }

    handleChange(event){
        const value = event.target.value;
        this.setState({color: value});
    }

    handleChangeBar(event){
        const value = event.target.value;
        this.setState({lineWidth: value});
    }

    toggleModal() {
        const { modalOpen } = this.state;
        this.props.rgbCallback(this.state.color);  
        this.setState({ modalOpen: !modalOpen, validTour: null });
    }

}