import React, {Component} from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalHeaderProps} from 'reactstrap';

export default class PlacesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.mod} toggle={this.props.change}>
                TODO
            </Modal>
        );
    }
}
