import React, { Component } from 'react';
import { Col, Container, Row, Button, Table, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Form, CustomInput} from 'reactstrap';
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
        this.renderLineStyleForm = this.renderLineStyleForm.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.renderLineOnOff= this.renderLineOnOff.bind(this);
        this.renderLineOpacity = this.renderLineOpacity.bind(this);
        this.handleOnOff= this.handleOnOff.bind(this);
        this.handleChangeOpacity = this.handleChangeOpacity(this);

        this.state = {
            modalOpen: false,
            color: '#11a1e8',
            lineWidth: 3,
            lineStyle: false,
            linesOn: true,
            lineOpacity: 3
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
                    {this.renderLineColor()}
                    {this.renderLineWidthForm()}   
                    {this.renderLineOnOff()}  
                    {this.renderLineStyleForm()} 
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

    renderLineOpacity(){
        return(
            <>
                <FormGroup>
                    <Label for="Range">Opacity ({this.state.lineOpacity})</Label>
                    <Input type="range" 
                            name="range" 
                            id="exampleRange" 
                            min= "1" max= "20"
                            value = {this.state.lineOpacity}
                            onChange = {this.handleChangeOpacity}/>
                </FormGroup>    
            </>
        );
    }

    renderLineWidthForm(){
        return(
            <>
                <FormGroup>
                    <Label for="Range">Line Width ({this.state.lineWidth})</Label>
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

    renderLineStyleForm(){
        return(
            <>
                <FormGroup>
                    <Label for="Checkbox">Line Style</Label>
                        <CustomInput type="switch" id="Switch" name="Switch" checked = {this.state.lineStyle} label= "Dashed Lines" onChange = {this.handleSwitch} />
                </FormGroup>
            </>
        )
    }

    renderLineOnOff(){
        return(
            <>
                <FormGroup>
                    <Label for="Checkbox">Lines On/Off</Label>
                        <CustomInput type="switch" id="Switch2" name="Switch2" checked = {this.state.linesOn} onChange = {this.handleOnOff} />
                </FormGroup>
            </>
        )
    }

    handleChange(event){
        const value = event.target.value;
        this.setState({color: value});
    }

    handleChangeBar(event){
        const value = event.target.value;
        this.setState({lineWidth: value});
    }

    handleChangeOpacity(event){
        const value = event.target.value;
        this.setState({lineOpacity: value});
    }

    handleSwitch(){
        this.setState({lineStyle: !this.state.lineStyle});
    }

    handleOnOff(){
        this.setState({linesOn: !this.state.linesOn})
    }

    toggleModal() {
        const { modalOpen } = this.state;
        this.props.rgbCallback(this.state.color); 
        this.props.setLineWidth(this.state.lineWidth); 
        this.props.setLineStyle(this.state.lineStyle);
        this.props.turnLinesOff(this.state.linesOn);
        this.setState({ modalOpen: !modalOpen});
    }

}