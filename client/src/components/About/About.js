import React, { Component } from 'react';
import { UncontrolledCollapse,Card, CardBody, Container, Row, Col, Button } from 'reactstrap';

import { CLIENT_TEAM_NAME } from "../../utils/constants";

export default class About extends Component {


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{CLIENT_TEAM_NAME}</h2>
                        <Button color="primary" id="toggler" size="sm">Misson Statement</Button>
                        <UncontrolledCollapse toggler="#toggler">
                            <Card>
                                <CardBody>
                                The Epic Gamers are committed making a quality product that is user friendly. 
                                Our purpose is to create clean and reactive solutions tailored to our customer's 
                                needs through effective communication and cutting-edge web design. 
                                Our goal is to create innovative solution to everyday problems.
                                We guarantee our customers will enjoy our well crafted product. 
                                </CardBody>
                            </Card>
                        </UncontrolledCollapse>
                    </Col>

                    <Col xs="auto">
                        <Button color="primary" onClick={this.props.closePage} xs={1}>
                            close
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <img src = "https://media.sproutsocial.com/uploads/2020/08/Social-for-Gamers.svg"
                         className = "Team Image"
                         alt = "...">
                    </img>
                </Row>
            
            </Container>
        );
    }
}
