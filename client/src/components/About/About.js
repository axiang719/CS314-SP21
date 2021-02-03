import React, { Component } from 'react';

import {
    UncontrolledCollapse, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, CardHeader, CardFooter, Container,
    Row, Col, Button, CardDeck, CardColumns
} from 'reactstrap';

import { CLIENT_TEAM_NAME } from "../../utils/constants";

export default class About extends Component {
    render() {
        const people = [{
            name: "Andie Groeling",
            bio: "I am a 3rd year Computer Engineering and Computer Science double major who enjoys vintage computers, baking, and Linux.",
            imagePath: "/src/static/images/bio-picture-andie.png",
            cardNum: 1
        },
        {
            name: "Chad Minning",
            bio: "My name is Chad Minning. I'm a non-traditional student in my 3rd year of the Computer Science program. I've gone from owning my own company in the construction industry, to full time education and I've loved the change. I enjoy cycling, videogames, and all things CS.",
            imagePath: "/src/static/images/ChadTurtle.jpg",
            cardNum: 2
        },
        {
            name: "Ethan Seefried",
            bio: "I'm Ethan Seefried, a student veteran who is a junior in Applied Physics with a minor in Computer Science. I enjoy playing video games in my free time, playing almost evry any sport and spending time with my family. My goal in life is to one day code on a space related project.",
            imagePath: "/src/static/images/EthanPanda.jpg",
            cardNum: 3
        },
        {
            name: "Anthony Xiang",
            bio: "Hi my name is Anthony, I'm a senior majoring in Applied Computing Technology and getting my minor in business administration. I Love to do anything outdoor related and I also have a deep passion about learning how technology works ",
            imagePath: "/src/static/images/Anthonylama.jpg",
            cardNum: 4
        },
        {
            name: "Michael Young",
            bio: "Hello, my name is Michael Young. I'm a junior majoring in Computer Science at CSU. In my free time I like playing video games, watching cartoons, drawing, and photographing animals. My dream job is to work in game development.",
            imagePath: "/src/static/images/MichaelCat.jpg",
            cardNum: 5
        }];

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
                    <img src="https://media.sproutsocial.com/uploads/2020/08/Social-for-Gamers.svg"
                        className="Team Image"
                        alt="...">
                    </img>
                </Row>
                <br></br>
                <CardColumns>
                    {people.map((person) => (
                        <Card>
                            <CardHeader tag="h4">{person.name}</CardHeader>
                            <CardBody>
                                <CardImg width="100%" src={person.imagePath} alt={"Picture of " + person.name} />
                                <CardText></CardText>
                                <Button color="primary" size="sm" id={"toggler" + person.cardNum}>About Me</Button>
                                <UncontrolledCollapse toggler={"#toggler" + person.cardNum}>
                                    <CardText>
                                        <br></br>
                                        {person.bio}
                                    </CardText>
                                </UncontrolledCollapse>
                            </CardBody>
                        </Card>
                    ))}
                </CardColumns>
            </Container>
        );
    }
}
