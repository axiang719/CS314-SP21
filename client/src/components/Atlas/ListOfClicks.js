import React, { Component } from 'react';
import {  Button, Table, Collapse, Container, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { BsGeoAlt, BsChevronUp, BsChevronDown, BsGearFill } from "react-icons/bs"

import LoadTour from "./LoadTour";
import SaveTour from "./SaveTour";
import OrderTour from './OrderTour';

export default class ListOfClicks extends Component { 
    constructor(props) {
        super(props);

        this.getRowInfo = this.getRowInfo.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.clearHandler = this.clearHandler.bind(this)
        this.toggleSettings = this.toggleSettings.bind(this)
        this.state = {
            toggleRow: [],
            settingsToggle: false
        }
    }

    render() {
        return (
            <Table size="sm" className="overflow-auto">
                <thead className="text-center bg-primary">
                    <tr>
                        <th>
                            <Row noGutters>
                                <Col className="text-center text-white ml-3">
                                    Places
                                </Col>
                                {this.renderDropdown()}
                            </Row>
                        </th>
                    </tr>
                </thead>
                {this.getTableBody()}
            </Table>
        );
    }

    renderDropdown() {
        return (
            <Dropdown 
                inNavbar
                className="text-right text-white mr-2" 
                isOpen={this.state.settingsToggle}
                direction="left"
                toggle={this.toggleSettings}>
                <DropdownToggle tag="div">
                    <BsGearFill/>
                </DropdownToggle>
                <DropdownMenu>
                    {this.renderLoadTour()}
                    {this.renderSaveTour()}
                    {this.props.checkForFeature("tour") && this.renderOrderTour()}
                    <DropdownItem onClick={this.clearHandler}>
                        Clear List
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderLoadTour() {
        return (
            <LoadTour
                setTour = { this.props.setTour }
                clearList = { this.props.clearList }
                setPlace = { this.props.setPlace }
                listOfClicks = { this.props.listOfClicks }
            />
        )
    }

    renderSaveTour(){
        return(
            <SaveTour 
                getPlaces = {this.props.getPlaces}
            />
        )  
    }

    renderOrderTour(){
        return (
            <OrderTour
                listOfClicks = {this.props.listOfClicks}
                setTour = {this.props.setTour}
                getPlaces = {this.props.getPlaces}
                serverSettings={this.props.serverSettings}
            />
        )
    }

    toggleSettings() {
        const {settingsToggle} = this.state;
        this.setState({settingsToggle: !settingsToggle});
    }

    getTableBody() {
        const {toggleRow} = this.state
        return (
            <tbody className="text-center">
                {this.props.listOfClicks.map((place, index) => (
                    <tr key={index}>
                        <td>
                            <Container className='text-center'>
                                <Row onClick={()=>{this.toggleHandler(index)}}>
                                    <Col sm={12} md={11}>
                                        {place.name}
                                    </Col>
                                    <Col>
                                        {toggleRow[index] ? <BsChevronDown/> : <BsChevronUp/>}
                                    </Col>
                                </Row>
                                {this.getRowInfo(place, index)}
                            </Container>        
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }

    getRowInfo(place, index) {
        let {toggleRow} = this.state
        const listSize = this.props.listOfClicks.length;
        const isLastPlace = index == listSize - 1 && index != 0; 
        const isDistancesSupported = this.props.checkForFeature('distances');
        return(
            <Collapse isOpen={toggleRow[index]}>
                <Row className="mt-2" noGutters={true}>
                    <Col xs="4" className="float-right">Latitude:  {place.latitude.toFixed(2)}<br/>Longitude: {place.longitude.toFixed(2)}</Col>
                    {isDistancesSupported && <Col xs="4">{isLastPlace ? "Distance back to start: " : "Distance to next:"} {place.distance} mi.</Col>}
                    <Col xs="2" className="text-right">
                        <Button color="primary" size="md" onClick={this.props.centerMapToIndex.bind(this.props, index)}>
                            <BsGeoAlt/>
                        </Button>
                    </Col>
                    <Col xs="2">
                        <Button close id="xButton" onClick={()=>{this.deleteHandler(index)}}/>
                    </Col>
                </Row>
            </Collapse>
        )
    }

    toggleHandler(index) {
        const { toggleRow } = this.state;
        if (toggleRow[index] == true) {
            toggleRow[index] = false;
        }
        else {
            toggleRow[index] = true;
        }
        this.setState({toggleRow});
    }

    deleteHandler(index) {
        const { toggleRow } = this.state;
        toggleRow.splice(index, 1);
        this.setState({toggleRow});
        this.props.removePlace(index);
    }

    clearHandler() {
        this.setState({toggleRow: []})
        this.props.clearList();
    }
}
