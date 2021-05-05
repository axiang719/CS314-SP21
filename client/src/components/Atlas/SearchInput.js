import React, { Component } from 'react';
import { Col, Row, Button, InputGroup, Input, Form,FormGroup, FormFeedback, InputGroupAddon, Container } from 'reactstrap';
import MatchSearch from "./MatchSearch";
import { BsGeoAlt, BsX } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";


import Coordinates from "coordinate-parser";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        
        this.processInput = this.processInput.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);

        this.state = {
            findSearch: true,
            inputText: "",
            filterToggle: false,

            coordinates: {
                latLng: null
            }
        };
    }

    render() {
        return (
            <div className="border rounded-bottom bg-white mb-2">
                <Container>
                    <Row className="mt-2">
                        <Col className="text-left mt-1" xs={12} md={{ size: 10, offset: 1 }}>
                            Search by location:
                            <BsX className="h5 float-right" onClick={this.props.toggleSearch}/>
                        </Col>
                        <Col xs={12} md={{ size: 10, offset: 1 }}>
                            <Form onSubmit={e => { e.preventDefault(); }}>
                                <FormGroup>
                                    {this.renderInput()}
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderInput() {
        const { inputText, findSearch, coordinates } = this.state;
        const inputIsEmpty = inputText == "";
        const isFindSearch = findSearch && this.props.checkForFeature("find");
        const invalidCoord = !isFindSearch && !coordinates.latLng && !inputIsEmpty;

        return (
            <>
                <InputGroup>
                    <Input
                        placeholder = "Name/Coordinates..."
                        onChange={this.processInput}
                        value={inputText}
                        invalid={invalidCoord}
                        className = "rounded-right"
                    />
                    <InputGroupAddon addonType="append">
                        { this.renderFilterButton(isFindSearch) }
                    </InputGroupAddon>
                    { this.chooseInput(isFindSearch) }
                    <FormFeedback>Format must be in latitude and Longitude</FormFeedback>
                </InputGroup>
            </>
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
        const { inputText, filterToggle } = this.state;
        const { showMessage, setMarker, serverSettings, checkForFeature } = this.props;
        return (
            <MatchSearch 
                inputText={inputText}
                showMessage={showMessage}
                setMarker={setMarker}
                serverSettings={serverSettings}
                checkForFeature={checkForFeature}
                filterToggle={filterToggle}
            />
        );
    }

    renderFilterButton(isFindSearch) {
		return(
			<Button 
                disabled={!isFindSearch}
                size="sm" 
                color="primary"
                onClick={this.toggleFilter}
            >
                <FaFilter/>
            </Button>
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

    toggleFilter() {
        const { filterToggle } = this.state;
        this.setState({ filterToggle: !filterToggle });
    }
}