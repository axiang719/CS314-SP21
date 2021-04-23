import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Form,FormGroup, FormFeedback} from 'reactstrap';

import Coordinates from "coordinate-parser"; 

import MatchSearch from "./MatchSearch";




export default class CoordinatesInput extends Component {
    constructor(props) {
        super(props);
        
        this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
        this.renderDropdown = this.renderDropdown.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);

        this.state = {
            searchType: "Coordinates",
            dropdownOpen: false,


            coordinates: {
                inputText: "",
                latLng: null
            }
        };
    }

    render() {
        return (
            <Row className="mt-4 mb-2">
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <Form onSubmit={e => { e.preventDefault(); }}>
                        <FormGroup>
                            {this.chooseInput()}
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }

    chooseInput() {
        if (this.state.searchType == "Match") {
            return this.renderNameInput();
        }
        else {
            return this.renderCoordinatesInput();
        }
    }

    renderNameInput() {
        return (
            <MatchSearch 
            renderDropdown={this.renderDropdown}
            listOfMatches={this.state.listOfMatches}
            setListOfMatches={this.setListOfMatches}
            showMessage={this.props.showMessage}
            setMarker={this.props.setMarker}
            toggle={this.changeModalOpen}
            serverSettings={this.props.serverSettings}
            checkForFeature={this.props.checkForFeature}/>
        );
    }
    
    //pull from code pen
    renderCoordinatesInput() {
        const coordinates = this.state.coordinates;
        const validCoordinates = coordinates.latLng != null;
        const inputBoxEmpty = !coordinates.inputText;
        
        return (
          
            <InputGroup>
                <Input
                    placeholder = "Latitude, Longitude"
                    onChange={this.processCoordinatesInput}
                    value={coordinates.inputText}
                    valid={validCoordinates}
                    invalid={!inputBoxEmpty && !validCoordinates}
                    />
                    {this.renderDropdown()}
                <Button type="submit" className="ml-1" color="primary" onClick={() => this.props.setMarker(coordinates.latLng)}>Search</Button>
                <FormFeedback>Format must be in latitude and Longitude</FormFeedback>
            </InputGroup>
           
        );
    }

    renderDropdown() {
        const findIsSupported = this.props.checkForFeature("find");
        if (findIsSupported) {() => {this.setState({searchType: "Coordinates"})}};
        
        if (findIsSupported) {
            return (
                <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle color="primary" caret />
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setState({ searchType: "Match", dropdownName: "Match" })}>Match</DropdownItem>
                        <DropdownItem onClick={() => this.setState({ searchType: "Coordinates", dropdownName: "Coord." })}>Coordinates</DropdownItem>
                        </DropdownMenu>
                </InputGroupButtonDropdown>
            )
        }
    }

   

    toggleDropDown () {
        const isOpen = this.state.dropdownOpen;
        this.setState({ dropdownOpen: !isOpen });
    }


        //problem: how to give movemarker method a parameter when passing this way?
    processCoordinatesInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        const coordinates = this.state.coordinates;

        coordinates.inputText = inputText;
        coordinates.latLng = this.getCoordinatesOrNull(inputText);
    
        this.setState({ coordinates: coordinates });
    }
    
    getCoordinatesOrNull(coordinateString) {
        try {
            const convertedCoordinates = new Coordinates(coordinateString);
            return {
                lat: convertedCoordinates.getLatitude(),
                lng: convertedCoordinates.getLongitude()
            };
        } catch (error) {
            return null;
        }
    }


}
