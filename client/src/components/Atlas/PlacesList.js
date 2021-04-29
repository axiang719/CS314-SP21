import React, { Component } from 'react';
import { Button, Container, Modal, ModalHeader, ModalBody, Table, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

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
                <Table hover bordered responsive size="sm">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>More Info</th>
                            <th>Add To Tour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfMatches.map((place, index) => (
                            <tr key={index} id={"popover" + index}>
                                <td>{place.name}</td>
                                <td>{this.renderMoreDetailsButton(place,index)}</td>
                                <td>{this.renderAddButton(place.latitude,place.longitude)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        };
    }

    renderMoreDetailsButton(place,index) {
        const p = place;
        const i = index;

        return (
            <Container>
                <Button color="primary" onClick={() => this.moreDetails(p,i)}>Info</Button>
            </Container>
        )
    }

    renderAddButton(lat,lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const latlng = {lat: latitude, lng: longitude};

        return (
            <Container>
                <Button color="primary" onClick={() => this.addButtonHandler(latlng)}>Add</Button>
            </Container>
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
