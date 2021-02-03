import React, { Component } from 'react';

import {
    UncontrolledCollapse, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardHeader, CardFooter, Container, 
    Row, Col, Button
} from 'reactstrap';

import {CLIENT_TEAM_NAME} from "../../utils/constants";

export default class About extends Component {
    render() {
    const people = [{name: "Andie Groeling",
                     bio: "I am a 3rd year Computer Engineering and Computer Science double major who enjoys vintage computers, baking, and Linux.",
                     imagePath: "/src/static/images/bio-picture-andie.png"},
                    {name: "Chad Minning",
                     bio: "My name is Chad Minning. I'm a non-traditional student in my 3rd year of the Computer Science program. I've gone from owning my own company in the construction industry, to full time education and I've loved the change. I enjoy cycling, videogames, and all things CS.",
                     imagePath: "/src/static/images/ChadTurtle.jpg"},
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
