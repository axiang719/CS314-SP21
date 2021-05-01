import React, { Component } from 'react';
import {  Button, Table, Collapse, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { BsGeoAlt, BsChevronUp, BsChevronDown, BsGearFill, BsTrash, BsThreeDots, BsHouseFill, BsArrowUpDown } from "react-icons/bs"

import LoadTour from "./LoadTour";
import SaveTour from "./SaveTour";
import OrderTour from './OrderTour';
import Atlas from './Atlas';

export default class ListOfClicks extends Component { 
    constructor(props) {
        super(props);

        this.getRowInfo = this.getRowInfo.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.clearHandler = this.clearHandler.bind(this)
        this.toggleSettings = this.toggleSettings.bind(this)
        this.toggleMeatballs = this.toggleMeatballs.bind(this)
        this.renderMeatballDropdown = this.renderMeatballDropdown.bind(this);
      
        this.state = {
            toggleRow: [],
            settingsToggle: false,
            meatballToggle: -1
        }
    }

    render() {
        return (
            <Table size="sm">
                <thead className="text-center bg-primary">
                    <tr>
                        <th>
                            <Row noGutters>
                                <Col className="text-center text-white" xs={{size:10, offset: 1}}>
                                    Places
                                </Col>
                                <Col xs={1}>
                                    {this.renderDropdown()}
                                </Col>
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
                className="text-white" 
                isOpen={this.state.settingsToggle}
                direction="left"
                toggle={this.toggleSettings}>
                <DropdownToggle tag="div">
                    <BsGearFill/>
                </DropdownToggle>
                <DropdownMenu>
                    {this.renderListOptions()}
                    <span className="text-left"><DropdownItem onClick={this.clearHandler}>
                        Clear List <BsTrash/>
                    </DropdownItem></span> 
                   <span className="text-left"><DropdownItem onClick={this.props.reverseList}>
                       reverse   <BsArrowUpDown className="text-right"/>
                   </DropdownItem></span>
                </DropdownMenu>
            </Dropdown>
        );
    }
    
    renderMeatballDropdown(index) {
            return (
                <Dropdown
                    inNavbar
                    className= "text-white" 
                    isOpen={this.state.meatballToggle===index}
                    direction="left"
                    toggle={this.toggleMeatballs}>
                    <DropdownMenu>
                        <span className="text-left"><DropdownItem onClick={()=> this.props.selectNewStartingLocation(index)}>
                            Start Here! <BsHouseFill/>
                        </DropdownItem></span> 
                    </DropdownMenu>
                </Dropdown> 
            );
    }
        
    

    renderListOptions() {
        const {setTour, clearList, setPlace, listOfClicks, 
            getPlaces, serverSettings, checkForFeature} = this.props;
        return (
            <>
                <LoadTour
                    setTour = {setTour}
                    clearList = {clearList}
                    setPlace = {setPlace}
                    listOfClicks = {listOfClicks}
                />
                <SaveTour 
                    getPlaces = {getPlaces}
                />
                {checkForFeature('tour') &&
                    <OrderTour
                        listOfClicks = {listOfClicks}
                        setTour = {setTour}
                        getPlaces = {getPlaces}
                        serverSettings={serverSettings}
                    />
                }
            </>
        );
    }

    toggleSettings() {
        const {settingsToggle} = this.state;
        this.setState({settingsToggle: !settingsToggle});
    }

    toggleMeatballs(index) {
        this.setState({meatballToggle : index})
    }

    getTableBody() {
        const {toggleRow} = this.state
        return (
            <tbody className="text-center">
                {this.props.listOfClicks.map((place, index) => (
                    <tr key={index}>
                        <td>
                            <Row noGutters className="text-center">
                                <Col xs={{size:10, offset: 1}} onClick={()=>{this.toggleHandler(index)}}>
                                    <div className="mx-1">
                                        {place.name}
                                        <div>{toggleRow[index] ? <BsChevronUp/> : <BsChevronDown/>}</div>
                                    </div>
                                </Col>
                                <Col xs={{size: 1}} className="text-center">
                                    <BsTrash className="text-danger" onClick={()=>{this.deleteHandler(index)}}/>
                                </Col>
                            </Row>
                            {this.getRowInfo(place, index)}    
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }

    getRowInfo(place, index) {
        let {toggleRow} = this.state
        const listSize = this.props.listOfClicks.length;
        const isLastPlace = index == listSize - 1 && index != 0; 
        const isDistancesSupported = this.props.checkForFeature('distances');
        return(
            <Collapse isOpen={toggleRow[index]}>
                <Row noGutters>
                    <Col xs={{size:5, offset:1}}>Coordinates: <br/>{place.latitude.toFixed(2) + ', ' + place.longitude.toFixed(2)}</Col>
                    <Col xs="5">
                        {isDistancesSupported && 
                            (isLastPlace ? "Distance back to start: " : "Distance to next: ") + place.distance + ' mi.'
                        }    
                    </Col>
                    <Col xs={{size:1}}>
                        <BsGeoAlt className ="text-primary" onClick={this.props.centerMapToIndex.bind(this.props, index)}/>
                        <div><BsThreeDots className = "text-primary" onClick={()=> this.toggleMeatballs(index)}></BsThreeDots></div>
                    </Col>
                    <Col>{this.renderMeatballDropdown(index)}</Col>
                </Row>
            </Collapse>
        )
    }

    toggleHandler(index) {
        const { toggleRow } = this.state;
        toggleRow[index] = !toggleRow[index];
        
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
