import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import Coordinates from "coordinate-parser"; 

export default class CoordinatesInput extends Component {
    constructor(props) {
        super(props);
        
        this.processCoordinatesInput = this.processCoordinatesInput.bind(this);
    
        this.state = {
            coordinates: {
                inputText: "",
                latLng: null
            }
        };
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                    {this.renderCoordinatesInput()}
                </Col>
            </Row>
        );
    }

    renderCoordinatesInput() {
        const coordinates = this.state.coordinates;
    
        return (
            <InputGroup className="mt-4">
                <Input
                    placeholder="Latitude, Longitude"
                    value={coordinates.inputText}
                    onChange={this.processCoordinatesInput}
                />
                <InputGroupAddon addonType="append">
                    <Button color="primary">Search</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }

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