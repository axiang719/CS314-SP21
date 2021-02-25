import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

export default class SearchList extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            modalOpen: false
        };
    }

    render() {
        return(
            <div>
                <Modal isOpen={toggleOpen} toggle={this.toggleModal} className={className}>
                    <ModalHeader toggle={this.toggleModal}>Results</ModalHeader>
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
            </div>
        )
    }

    toggleModal() {
        const modalOpen = this.state.modalOpen;
        this.setState({ modalOpen: !modalOpen })
    }

}