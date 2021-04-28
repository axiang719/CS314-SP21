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
                <Table hover bordered size="sm">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            {listOfMatches[0].country && <th>Country</th>}
                            {listOfMatches[0].region && <th>Region</th>}
                            <th>Add To Tour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfMatches.map((place, index) => (
                            <tr key={index} id={"popover" + index}>
                                <td>{place.name}</td>
                                {place.country && <td>{place.country}</td>}
                                {place.region && <td>{place.region}</td>}
                                <div>{this.renderAddButton(place.latitude,place.longitude)}</div>
                                {this.moreDetails(place, index)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        };
    }

    renderAddButton(lat,lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        return (
            <Container>
                <Button onClick={() => this.addButtonHandler(latitude,longitude)}>Go</Button>
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
                    {place.municipality && <div>Municipality: {place.municipality}</div>}
                    {place.type && <div>Type: {place.type}</div>}
                    <div>Latitude: {latitude.toFixed(6)}</div> 
                    <div>Longitude: {longitude.toFixed(6)}</div>
                </PopoverBody>
            </UncontrolledPopover>
        )
    }

    addButtonHandler(lat,lng) {
        const latLng = {lat: lat, lng: lng};
        this.props.setMarker(latLng);
        this.props.toggleModal();
    }
}
