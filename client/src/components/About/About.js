import React, {Component} from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardHeader,
    CardFooter, Container, Row, Col, Button
} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

export default class About extends Component {
    render() {
    const people = [{name: "abc d",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg"},
                    {name: "abc d",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg"},
                    {name: "abc d",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg"},
                    {name: "abc d",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg"},
                    {name: "abc d",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg"}];

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
                    {people.map((person) => (
                    <Col>
                    <Card>
                        <CardHeader tag="h4">{person.name}</CardHeader>
                        <CardBody>
                            <img width="100%" src={person.imagePath} alt={person.name} />
                            <CardText>{person.bio}</CardText>
                        </CardBody>
                    </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}
