import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input,Form,FormGroup} from 'reactstrap';
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
   //pull from code pen
    renderCoordinatesInput() {
        const coordinates = this.state.coordinates;
        const validCoordinates = coordinates.latLng != null;
        const inputBoxEmpty = !coordinates.inputText;
    
        return (
            <InputGroup className="mt-4">
                <Input
                   onChange={this.processCoordinatesInput}
                   value={coordinates.inputText}
                   valid={validCoordinates}
                   invalid={!inputBoxEmpty && !validCoordinates}
                />
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => this.props.setMarker(coordinates.latLng)}>Search</Button>
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
