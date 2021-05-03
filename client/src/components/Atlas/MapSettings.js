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
        this.renderLineColor = this.renderLineColor.bind(this);

        this.state = {
            modalOpen: false,
            color: '#11a1e8',
            lineWidth: 3
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
                    {this.renderLineColor()}
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

    renderLineColor(){
        return(
            <>
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
                            min= "1" max= "20"
                            value = {this.state.lineWidth}
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
        this.props.setLineWidth(this.state.lineWidth);
        this.setState({ modalOpen: !modalOpen, validTour: null });
    }

}