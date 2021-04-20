import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, ListGroup, ListGroupItem } from "reactstrap";

import { sendServerRequest, isJsonResponseValid } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ConfigResponse";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            config: {},
            supportedFeatures: ['config','find','type','where','distances','tour']
        };

        this.saveInputText = this.state.inputText;
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen()}>
                <ModalHeader toggle={() => this.props.toggleOpen()}>Server Connection</ModalHeader>
                {this.renderSettings(this.getCurrentServerName())}
                {this.renderFooterActions()}
            </Modal>
        );
    }

    renderSettings(currentServerName) {
        return (
            <ModalBody>
                <Row className="m-2">
                    <Col>
                        Name: {currentServerName}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col xs={2}>
                        URL:
                    </Col>
                    <Col xs={10}>
                        {this.renderInputField()}
                    </Col>
                </Row>
                {this.renderServerFeatures()}
            </ModalBody>
        );
    }

    renderTypeWhereDomain(){

    }

    renderInputField() {
        return(
            <Input onChange={(e) => this.updateInput(e.target.value)}
                   value={this.state.inputText}
                   placeholder={this.props.serverPort}
                   valid={this.state.validServer}
                   invalid={!this.state.validServer && this.state.validServer !== null}
            />
        );
    }

    renderServerFeatures() {
        let { config, validServer } = this.state;
        if (validServer && config.features) {
            return (
                <>
                    <Row className="m-2">
                        <Col>
                            {"Proposed Server Features:"}
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col>
                            {this.renderFeatureList(config)}
                        </Col>
                    </Row>    
                </>
            );
        };
    }

    renderFeatureList(config) {
        const {supportedFeatures} = this.state;
        return(
            <ListGroup>
                {config.features.map((feature, index) =>
                    <ListGroupItem key={index}>
                        {feature} {supportedFeatures.includes(feature) ? <span className = "text-primary"> <small><i>Supported</i></small> </span> : 
                                                                         <span className = "text-danger"> <small><i>Unsupported</i></small> </span>}
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }

    renderFooterActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.resetServerSettingsState(this.state.inputText);
                }}
                        disabled={!this.state.validServer}
                >
                    Save
                </Button>
            </ModalFooter>
        );
    }

    getCurrentServerName() {
        let currentServerName = this.props.serverSettings.serverConfig && this.state.validServer === null ?
                                this.props.serverSettings.serverConfig.serverName : "";
        if (this.state.config && Object.keys(this.state.config).length > 0) {
            currentServerName = this.state.config.serverName;
        }
        return currentServerName;
    }

    updateInput(url) {
        this.setState({inputText: url}, () => {
            if (this.shouldAttemptConfigRequest(url)) {
                this.sendConfigRequest(url);
            } else {
                this.setState({validServer: false, config: {}});
            }
        });
    }

    sendConfigRequest(destinationUrl) {
        this.setState({validServer: null});
        sendServerRequest({requestType: "config"}, destinationUrl)
            .then(configResponse => {
                if (destinationUrl === this.state.inputText) {
                    if (configResponse) {
                        this.processConfigResponse(configResponse);
                    } else {
                        this.setState({validServer: false, config: null});
                    }
                }
            });
    }

    shouldAttemptConfigRequest(resource) {
        const urlRegex = /https?:\/\/.+/;
        return resource.match(urlRegex) !== null && resource.length > 15;
    }

    processConfigResponse(configResponse) {
        console.log(configResponse);
        if (!isJsonResponseValid(configResponse, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            this.setState({validServer: true, config: configResponse});
        }
    }

    resetServerSettingsState(inputText=this.saveInputText) {
        this.props.toggleOpen();
        this.setState({
            inputText: inputText,
            validServer: null,
            config: false
        });
    }
}
