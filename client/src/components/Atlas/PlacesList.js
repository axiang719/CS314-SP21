import React, { Component } from 'react';
import { Button, Container, Modal, ModalHeader, ModalBody, Table, UncontrolledPopover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem, Row, Col} from 'reactstrap';
import { BsPlusCircle, BsInfoCircle}  from "react-icons/bs"
export default class PlacesList extends Component {
    constructor(props) {
        super(props);

        this.moreDetails = this.moreDetails.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
        this.addButtonHandler = this.addButtonHandler.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    render() {
        return(
            <Modal isOpen={this.props.modalOpen} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>Results</ModalHeader>
                <ModalBody>
                    {this.renderTable()}
                </ModalBody>
            </Modal>
        )
    }

    renderTable() {
        const listOfMatches = this.props.listOfMatches;
        if (listOfMatches.length) {
            return (
        //             <tbody>
        //                 {listOfMatches.map((place, index) => (
        //                     <tr key={index} id={"popover" + index}>
        //                         <Row noGutters>
        //                              <Col xs = {8}>{place.name}</Col>
        //                              <Col xs = {{size: 1}}>{this.renderMoreDetailsButton(place,index)}</Col>
        //                              <Col xs = {{size: 1, offset: 2}}>{this.renderAddButton(place.latitude,place.longitude)}</Col>
        //                         </Row>
        //                     </tr>
        //                 ))}
        //             </tbody>
                <Container>
                        {listOfMatches.map((place, index) => (
                                <Row noGutters className = "py-2" key={index}>
                                    <Col md = {9} xs = {7}>{place.name}</Col>
                                    <Col md = {1} xs = {{size: 2}} className = "text-right">{this.renderMoreDetailsButton(place,index)}</Col>
                                    <Col md = {1} xs = {{size: 2, offset: 1}} className = "text-right">{this.renderAddButton(place.latitude,place.longitude)}</Col>
                                    {this.moreDetails(place, index)}
                                </Row>
                        ))}
                </Container>
            )}
    }

    renderMoreDetailsButton(place,index) {
        const p = place;
        const i = index;

        return (
                <Button color="primary" size = "small" id={"popover" + index} onClick={() => this.moreDetails(p,i) }><BsInfoCircle/></Button>
        )
    }

    renderAddButton(lat,lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const latlng = {lat: latitude, lng: longitude};

        return (
                <Button color="primary" size = "small" onClick={() => this.addButtonHandler(latlng)}><BsPlusCircle/></Button>
        );
    }

    moreDetails(place, index) {  
        const latitude = parseFloat(place.latitude);
        const longitude = parseFloat(place.longitude);
        
        return (
            <UncontrolledPopover trigger="legacy" placement="bottom" target={"popover" + index}>
                <PopoverHeader>{place.name}</PopoverHeader>
                <PopoverBody>
                    {place.country && <div>Country: {place.country}</div>}
                    {place.region && <div>Region: {place.region}</div>}
                    {place.municipality && <div>Municipality: {place.municipality}</div>}
                    {place.type && <div>Type: {place.type}</div>}
                    <div>Latitude: {latitude.toFixed(6)}</div> 
                    <div>Longitude: {longitude.toFixed(6)}</div>
                </PopoverBody>
            </UncontrolledPopover>
        )
    }

    addButtonHandler(latlng) {
        this.props.setMarker(latlng);
    }
}
