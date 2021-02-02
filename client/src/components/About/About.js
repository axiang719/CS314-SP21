import React, {Component} from 'react';

import {Container, Row, Col, Button} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

export default class About extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>{CLIENT_TEAM_NAME}</h2>
                    </Col>

                    <Col xs="auto">
                        <Button color="primary" onClick={this.props.closePage} xs={1}>
                            Close
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <img src = "https://media.sproutsocial.com/uploads/2020/08/Social-for-Gamers.svg"
                    className = "Team Image"
                    alt = "..."
                    ></img>
                </Row>
            
            </Container>
        );
    }
}
