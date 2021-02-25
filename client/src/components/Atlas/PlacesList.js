import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class PlacesList extends Component {
    constructor(props) {
        super(props);

        this.moreDetails = this.moreDetails.bind(this);
        this.popoverButtonHandler = this.popoverButtonHandler.bind(this);
    }

    render() {
        return(
            <Modal isOpen={this.props.modalOpen} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>Results</ModalHeader>
                <ModalBody>
                    <Table hover bordered size="sm">
                        <thead className="text-center">
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.listOfMatches.map((place, index) => (
                                <tr key={index} id={"popover" + index}>
                                    <td>{place.name}</td>
                                    <td>{place.country}</td>
                                    <td>{place.region}</td>
                                    {this.moreDetails(place, index)}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        )
    }

    moreDetails(place, index) {  
        const latitude = parseFloat(place.latitude);
        const longitude = parseFloat(place.longitude);
        const latLng = {lat: latitude, lng: longitude};

        return (
            <UncontrolledPopover trigger="legacy" placement="bottom" target={"popover" + index}>
                <PopoverHeader>{place.name}</PopoverHeader>
                <PopoverBody>
                    {"Municipality: " + place.municipality}
                    <br/>
                    {"Type: " + place.type}
                    <br/>
                    {"Latitude: " + latitude.toFixed(6)}
                    <br/>
                    {"Longitude: " + longitude.toFixed(6)}
                    <br/>
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
