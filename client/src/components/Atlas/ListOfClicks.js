import React, { Component } from 'react';

import {  Button, Table, Collapse, Row, Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { BsGeoAlt, BsChevronUp, BsChevronDown, BsGearFill, BsTrash, BsThreeDots, BsHouseFill,BsArrowUpDown, BsCardText, BsXCircle } from "react-icons/bs"

import LoadTour from "./LoadTour";
import SaveTour from "./SaveTour";
import OrderTour from './OrderTour';
import FilterTour from './FilterTour';

export default class ListOfClicks extends Component { 
    constructor(props) {
        super(props);

        this.getRowInfo = this.getRowInfo.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.clearHandler = this.clearHandler.bind(this)
        this.setNotes = this.setNotes.bind(this)
        this.toggleSettings = this.toggleSettings.bind(this)
        this.toggleMeatballs = this.toggleMeatballs.bind(this)
        this.renderMeatballDropdown = this.renderMeatballDropdown.bind(this)
        this.processInput = this.processInput.bind(this)
        this.renderNotesOutput = this.renderNotesOutput.bind(this)
        this.saveNotes = this.saveNotes.bind(this)
      
        this.state = {
            toggleRow: [],
            settingsToggle: false,
            meatballToggle: -1,
            notesToggle: -1,
            notes: [],
            hasNotes: []
        }
    }

    render() {
        return (
            <Table size="sm">
                <thead className="text-center bg-primary">
                    <tr>
                        <th>
                            <Row noGutters>
                                <Col className="text-center text-white" xs={{size:8, offset: 2}}>
                                    Places
                                </Col>
                                <Col xs={1} className="text-right">
                                    <FilterTour
                                        listOfClicks = {this.props.listOfClicks}
                                    />
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
                    <BsGearFill className="mb-1"/>
                </DropdownToggle>
                <DropdownMenu>
                    {this.renderListOptions()}
                    <DropdownItem onClick={this.clearHandler}>
                        Clear List <BsTrash className="float-right"/>
                    </DropdownItem>
                    <DropdownItem onClick={this.props.reverseList}>
                        Reverse   <BsArrowUpDown className="float-right"/>
                    </DropdownItem>
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
                        <DropdownItem onClick={()=> this.props.selectNewStartingLocation(index)}>
                            Start Here! <BsHouseFill/>
                        </DropdownItem>
                        <DropdownItem onClick={() => this.setNotes(index)}>
                            Add Notes <BsCardText/>
                        </DropdownItem>
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

    setNotes(index) {
        this.setState({notesToggle: index})
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
        let {notesToggle} = this.state
        let {hasNotes} = this.state
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
                {notesToggle===index && this.renderNotesInput(index)}
                {hasNotes[index] && this.renderNotesOutput(index)}
            </Collapse>
        )
    }

    renderNotesInput(index) {
        return (
            <Row noGutters>
                <Col>
                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>
                            <Button color='primary' onClick={() => this.setNotes(-1)}><BsXCircle/></Button>
                        </InputGroupAddon>
                        <Input placeholder='Notes' onChange={this.processInput}/>
                        <InputGroupAddon addonType='append'>
                            <Button color='primary' onClick={() => this.saveNotes(index)}>Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
        );
    }

    renderNotesOutput(index) {
        let {notes} = this.state
        return (
            <Row noGutters>
                <Col xs={{offset:1}}>
                    Notes: {notes[index]}
                </Col>
            </Row>
        );
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

    processInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        const newNotes = this.state.notes;
        const target = this.state.notesToggle;

        newNotes[target] = inputText;
        this.setState({notes: newNotes})
    }

    saveNotes(index) {
        const newNote = this.state.notes[index]
        const newHasNotes = this.state.hasNotes
        newHasNotes[index] = 1;
        this.setState({hasNotes: newHasNotes})

        this.props.addNoteToPlace(index,newNote)

        this.setNotes(-1);
    }
}
