import React, { Component } from 'react';

import {
    UncontrolledCollapse, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardHeader, CardFooter, Container, 
    Row, Col, Button
} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

export default class About extends Component {
    render() {
    const people = [{name: "AndieGroeling",
                     bio: "I am a 3rd year Computer Engineering and Computer Science double major who enjoys vintage computers, baking, and Linux.",
                     imagePath: "/src/static/images/bio-picture-andie.png",
                     cardNum: 1},
                    {name: "abc",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg",
                     cardNum: 2},
                    {name: "abcd",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg",
                     cardNum: 3},
                    {name: "abcde",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg",
                     cardNum: 4},
                    {name: "abcdef",
                     bio: "placeholder bio",
                     imagePath: "../src/static/images/imageName.jpg",
                     cardNum: 5}];

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
                <br></br>
                <Row>
                    <img src = "https://media.sproutsocial.com/uploads/2020/08/Social-for-Gamers.svg"
                        className = "Team Image"
                        alt = "...">
                    </img>
                </Row>
                <br></br>
                <Row>
                    {people.map((person) => (
                    <Col>
                        <Card>
                            <CardHeader tag="h4">{person.name}</CardHeader>
                            <CardBody>
                                <CardImg width="100%" src={person.imagePath} alt={person.name} />
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" size="sm" id={"toggler" + person.cardNum}>About Me</Button>
                                <UncontrolledCollapse toggler={"#toggler" + person.cardNum}>
                                    <CardText>{person.bio}</CardText>
                                </UncontrolledCollapse>
                            </CardFooter>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}
