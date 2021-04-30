import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Form,FormGroup, FormFeedback } from 'reactstrap';
import MatchSearch from "./MatchSearch";
import { BsSearch, BsGeoAlt } from "react-icons/bs";

import Coordinates from "coordinate-parser";


export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        
        this.processInput = this.processInput.bind(this);

        this.state = {
            findSearch: true,
            inputText: "",

            coordinates: {
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
                            {this.renderInput()}
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }

    renderInput() {
        const { inputText, findSearch, coordinates } = this.state;
        const inputIsEmpty = inputText == "";
        const isFindSearch = findSearch && this.props.checkForFeature("find");
        const invalidCoord = !isFindSearch && !coordinates.latLng && !inputIsEmpty;

        return (
            <InputGroup>
                <Input
                    placeholder = "Search Location..."
                    onChange={this.processInput}
                    value={inputText}
                    invalid={invalidCoord}
                    className = "rounded-right"
                />
                { this.chooseInput(isFindSearch) }
                <FormFeedback>Format must be in latitude and Longitude</FormFeedback>
            </InputGroup>
        );
    }

    chooseInput(isFindSearch) {
        if (isFindSearch) {
            return this.renderFindSearch();
        }
        else {
            return this.renderCoordSearch();
        }
    }

    renderCoordSearch() {
        const { coordinates } = this.state;
        return (
            <>
                <Button 
                    type="submit" 
                    className="ml-1" 
                    color="primary" 
                    onClick={() => this.props.setMarker(coordinates.latLng)}>
                       <BsGeoAlt/>
                </Button>
            </>
        );
    }

    renderFindSearch() {
        const { inputText } = this.state;
        const { showMessage, setMarker, serverSettings, checkForFeature } = this.props;
        return (
            <MatchSearch 
                inputText={inputText}
                showMessage={showMessage}
                setMarker={setMarker}
                serverSettings={serverSettings}
                checkForFeature={checkForFeature}
            />
        );
    }

    processInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        let findSearch = false;
        const { coordinates } = this.state;

        coordinates.latLng = this.getCoordinatesOrNull(inputText);
        
        if (!coordinates.latLng) {
            findSearch = this.props.checkForFeature("find");
        } 

        this.setState({ coordinates, inputText, findSearch });
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