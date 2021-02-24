import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Form,FormGroup, FormFeedback} from 'reactstrap';
import Coordinates from "coordinate-parser";

import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/FindResponse";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";

export default class CoordinatesInput extends Component {
    constructor(props) {
        super(props);
        
        this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
        this.processKeywordInput = this.processKeywordInput.bind(this);
        this.processKeywordButton = this.processKeywordButton.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);
        this.processServerFindSuccess = this.processServerFindSuccess.bind(this);

        this.state = {
            searchType: "Coordinates",
            dropdownOpen: false,
            keyword: "",
            findRequest: {
                requestType: "find",
                match: "",
                limit: 100
            },
            coordinates: {
                inputText: "",
                latLng: null
            }
        };
    }

    render() {
        return (
            <Row className="mt-4">
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
        if (this.state.searchType == "Keyword") {
            return this.renderNameInput();
        }
        else {
            return this.renderCoordinatesInput();
        }
    }

    renderNameInput() {
        const keyword = this.state.keyword;
        const findRequest = this.state.findRequest;

        return (
            <InputGroup>
                <Input
                    placeholder = "Keyword"
                    onChange={this.processKeywordInput}
                    value = {keyword}
                    />
                    {this.renderDropdown()}
                <Button className="ml-1" color="primary" onClick={this.processKeywordButton}>Search</Button>
            </InputGroup>
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
                <Button className="ml-1" color="primary" onClick={() => this.props.setMarker(coordinates.latLng)}>Search</Button>
                <FormFeedback>Format must be in latitude and Longitude</FormFeedback>
            </InputGroup>
        );
    }

    renderDropdown() {
        return (
            <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle color="primary" caret>
                    Type
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.setState({ searchType: "Keyword" })}>Keyword</DropdownItem>
                    <DropdownItem onClick={() => this.setState({ searchType: "Coordinates" })}>Coordinates</DropdownItem>
                </DropdownMenu>
            </InputGroupButtonDropdown>
        )
    }

    toggleDropDown () {
        const isOpen = this.state.dropdownOpen;
        this.setState({ dropdownOpen: !isOpen });
    }

    processKeywordInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        
        this.setState({ keyword: inputText });
    }

    processKeywordButton() {
        const findRequest = this.state.findRequest;
        if (findRequest.match != null) {
            this.sendFindRequest(findRequest);
        } 
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

    sendFindRequest(request) {
		sendServerRequest(request)
			.then(findResponse => {
				if (findResponse) {
					this.processFindResponse(findResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed. Please Try Again Later.", "error");
				}
		    });
	}

	processFindResponse(findResponse) {
		if (!isJsonResponseValid(findResponse, findSchema)) {
			this.processServerConfigError("Find Response Not Valid. Check The Server.");
		} else {
			this.processServerFindSuccess(findResponse);
		}
	}

    processServerFindSuccess(findResponse) {
		LOG.info("Receiving find response from:", this.props.serverSettings.serverPort);
		this.setState({listOfMatches: findResponse});
	}
}
