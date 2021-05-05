import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Input, Container, Row, Col } from 'reactstrap';
import { BsX } from "react-icons/bs";

export default class FilterTour extends Component {
    constructor(props) {
        super(props);

        this.renderFilter = this.renderFilter.bind(this);
        this.filterOnChange = this.filterOnChange.bind(this);

    };

    render() {
        return(
            <>
                {this.renderFilter()}
            </>
        );
    }

    renderFilter(){
        const { filterToggle, toggleFilter, filterInput } = this.props;
        if (filterToggle) {
            return (
                <div className="border rounded-top bg-white">
                    <Container className="mb-3">
                        <Row className="mt-2">
                            <Col className="text-left" xs={12} md={{ size: 10, offset: 1 }}>
                                Filter by name: <BsX className="h5 float-right" onClick={toggleFilter}/>
                            </Col>
                            <Col xs={12} md={{ size: 10, offset: 1 }}>
                                <Input 
                                    placeholder="Name..."
                                    value={filterInput}
                                    onChange={this.filterOnChange} 
                                />
                            </Col>
                        </Row> 
                    </Container>
                </div>
            );
        };
    }

    filterOnChange(e) {
        const filterInput = e.target.value;
        this.props.updateFilterInput(filterInput);
    }

}
