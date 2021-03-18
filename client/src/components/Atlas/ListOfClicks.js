import React, { Component } from 'react';
import {  Button, Table, Collapse, Container, Row, Col} from 'reactstrap';
import { BsGeoAlt, BsChevronUp, BsChevronDown, BsTrash } from "react-icons/bs"

export default class ListOfClicks extends Component { 
    constructor(props) {
        super(props);

        this.getRowInfo = this.getRowInfo.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.clearHandler = this.clearHandler.bind(this)
        this.state = {
            toggleRow: null
        }
    }

    render() {
        return (
            <Table size="sm">
                <thead className="text-center">
                    <tr>
                        <th className="text=left">Places
                            <Button close id="clear" onClick={this.clearHandler}><BsTrash/></Button>
                        </th>
                    </tr>
                </thead>
                {this.getTableBody()}
            </Table>
        );
    }

    getTableBody() {
        const {toggleRow} = this.state
        return (
            <tbody className="text-center">
                {this.props.listOfClicks.map((place, index) => (
                    <tr key={index}>
                        <td>
                            <Container className='text-center'>
                                <Row onClick={()=>{this.toggleHandler(index)}}>
                                    <Col sm={12} md={11}>
                                        {place.address}
                                    </Col>
                                    <Col>
                                        {toggleRow == index ? <BsChevronDown/> : <BsChevronUp/>}
                                    </Col>
                                </Row>
                                {this.getRowInfo(place, index)}
                            </Container>        
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    }

    getRowInfo(place, index) {
        let {toggleRow} = this.state
        return(
            <Collapse isOpen={toggleRow == index}>
                <Row className="mt-2" noGutters={true}>
                    <Col xs="4" className="float-right">Latitude:  {place.latitude.toFixed(2)}<br/>Longitude: {place.longitude.toFixed(2)}</Col>
                    <Col xs="4">Distance to next: {place.distance}</Col>
                    <Col xs="2" className="text-right">
                        <Button color="primary" size="md" onClick={this.props.centerMapToIndex.bind(this.props, index)}>
                            <BsGeoAlt/>
                        </Button>
                    </Col>
                    <Col xs="2">
                        <Button close id="xButton" onClick={()=>{this.deleteHandler(index)}}/>
                    </Col>
                </Row>
            </Collapse>
        )
    }

    toggleHandler(toggleRow) {
        if (this.state.toggleRow == toggleRow) {
            this.setState({toggleRow: null})
        }
        else {
            this.setState({toggleRow})
        }
    }

    deleteHandler(index) {
        this.setState({toggleRow: null})
        this.props.removePlace(index)
    }

    clearHandler() {
        this.setState({toggleRow: null})
        this.props.clearList();
    }
}
