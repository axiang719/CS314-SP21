import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class PlacesList extends Component {
    constructor(props) {
        super(props);

        this.moreDetails = this.moreDetails.bind(this);
        this.popoverButtonHandler = this.popoverButtonHandler.bind(this);
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
                        </tr>
                    </thead>
                    <tbody>
                        {listOfMatches.map((place, index) => (
                            <tr key={index} id={"popover" + index}>
                                <td>{place.name}</td>
                                {place.country && <td>{place.country}</td>}
                                {place.region && <td>{place.region}</td>}
                                {this.moreDetails(place, index)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
        };
    }

    moreDetails(place, index) {  
        const latitude = parseFloat(place.latitude);
        const longitude = parseFloat(place.longitude);
        const latLng = {lat: latitude, lng: longitude};

        return (
            <UncontrolledPopover trigger="legacy" placement="bottom" target={"popover" + index}>
                <PopoverHeader>{place.name}</PopoverHeader>
                <PopoverBody>
                    {place.municipality && <div>Municipality: {place.municipality}</div>}
                    {place.type && <div>Type: {place.type}</div>}
                    <div>Latitude: {latitude.toFixed(6)}</div> 
                    <div>Longitude: {longitude.toFixed(6)}</div>
                    <Button onClick={() => this.popoverButtonHandler(latLng)}>Go</Button>
                </PopoverBody>
            </UncontrolledPopover>
        )
    }

    popoverButtonHandler(latLng) {
        this.props.setMarker(latLng);
        this.props.toggleModal();
    }
}
