import React, { Component } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, ListGroup, ListGroupItem, Table} from "reactstrap";
import Select from 'react-select-virtualized'
import { BsSearch, BsCheck, BsX } from "react-icons/bs"

import { sendServerRequest, isJsonResponseValid, isSupportedFeature } from "../../utils/restfulAPI";

import * as configSchema from "../../../schemas/ConfigResponse";

export default class ServerSettings extends Component {

    constructor(props) {
        super(props);

        this.toggleDomain = this.toggleDomain.bind(this);
        
        this.state = {
            inputText: this.props.serverSettings.serverPort,
            validServer: null,
            supportedFeatures: ['config','find','type','where','distances','tour'],
            currentConfig: null,
            config: {},
            domainToggle: ""
        };

        this.saveInputText = this.state.inputText;
    }

    componentDidMount() {
        this.sendConfigRequest(this.props.serverSettings.serverPort);
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
        const { config, currentConfig, validServer } = this.state;
        if (currentConfig) {
            return (
                <>
                    <Row className="ml-1 mb-2">
                        <Col>
                            {"Server Features:"}
                        </Col>
                    </Row>
                    {this.renderFeatureTable(config, currentConfig, validServer)}
                </>
            );
        };
    }

    renderFeatureTable(config, currentConfig, validServer) {
        const differentServers = validServer && currentConfig != config;
        return (
            <Table>
                <thead>
                    <tr>
                        <th className="text-center">Current Server</th>
                        { differentServers && <th className="text-center">New Server</th> }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.renderFeatureList(currentConfig)}</td>
                        { differentServers && <td>{this.renderFeatureList(config)}</td> }
                    </tr>
                </tbody>
            </Table>
        );
    }

    renderFeatureList(config) {
        const {supportedFeatures} = this.state;
        let isSupported;
        let hasDomain;
        const supported = <Col className="text-success text-right"> <BsCheck/></Col>;
        const unsupported = <Col className ="text-danger text-right"> <BsX/> </Col>;
        config.features.sort();
        return(
            <ListGroup>
                {config.features.map((feature, index) =>
                    <ListGroupItem key={index}>
                        {isSupported = this.isSupportedFeature(config, feature, supportedFeatures)}
                        {hasDomain = (feature == 'type' || feature == 'where' && isSupported)}
                        <Row noGutters={true}>
                            <Col>{feature}</Col>
                            {isSupported ? supported : unsupported}
                        </Row>
                        {(hasDomain && isSupported) && this.renderDomain(config, feature)}
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }

    isSupportedFeature(config, feature, supportedFeatures) {
        if (supportedFeatures.includes(feature)) {
            if(feature == 'type' || feature == 'where') {
                return config[feature] != null;
            } else {
                return true;
            }
        }
        return false;
    }

    renderDomain(config, feature) {
        const toggleValue = config.serverName + feature;
        return (
            <Row onClick={ () => this.toggleDomain(toggleValue) }>
                <Col>
                    <small>({config[feature].length}) items <BsSearch/></small>
                    {this.renderDomainModal(config, feature, toggleValue)}
                </Col>
            </Row>
        );
    }

    renderDomainModal(config, feature, toggleValue) {
        const { domainToggle } = this.state;
        return (
            <Modal isOpen={ domainToggle === toggleValue } toggle={ () => this.toggleDomain(toggleValue) }> 
                <ModalHeader toggle={ () => this.toggleDomain(toggleValue) }> 
                    Valid '{feature}' domain
                </ModalHeader>
                <ModalBody>
                    <Select 
                        placeholder="Domain value..."
                        options={this.generateOptions(config, feature)}
                    />
                </ModalBody>
            </Modal>
        );
    }

    generateOptions(config, feature) {
        const optionValues = config[feature];
        let options = [];
        optionValues.forEach(value => options.push({value: value, label: value}))
        return options;
    }

    toggleDomain(toggleValue) {
        console.log(toggleValue)
        let { domainToggle } = this.state;
        domainToggle === toggleValue ? domainToggle = "" : domainToggle = toggleValue;
        this.setState({ domainToggle });
    }

    renderFooterActions() {
        return (
            <ModalFooter>
                <Button color="primary" onClick={() => this.resetServerSettingsState()}>Cancel</Button>
                <Button color="primary" onClick={() =>
                {
                    this.props.processServerConfigSuccess(this.state.config, this.state.inputText);
                    this.setState({ currentConfig: this.state.config });
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
        let { currentConfig } = this.state
        console.log(configResponse);
        if (!isJsonResponseValid(configResponse, configSchema)) {
            this.setState({validServer: false, config: false});
        } else {
            if (!currentConfig) {
                currentConfig = configResponse;
            }
            this.setState({validServer: true, config: configResponse, currentConfig});
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