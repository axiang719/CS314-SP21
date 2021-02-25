import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

export default class SearchList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Modal isOpen={this.props.modalOpen} toggle={this.props.toggleModal()} className="ListOfMatches">
                <ModalHeader toggle={this.props.toggleModal()}>Results</ModalHeader>
                <ModalBody>
                    <Table hover bordered size="sm">
                        <thead className="text-center">
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                            {this.props.listOfMatches.map((place, index) => (
                                <tr key={index}>
                                    <td>{place.name}</td>
                                    <td>{place.country}</td>
                                    <td>{place.latitude.toFixed(6)}</td>
                                    <td>{place.longitude.toFixed(6)}</td>
                                </tr>
                            ))}
                    </Table>
                </ModalBody>
            </Modal>
        )
    }

}