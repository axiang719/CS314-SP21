import React, { Component } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { BsSearch } from "react-icons/bs";

import PlacesList from "./PlacesList";

import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/FindResponse";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import TypeSearch from "./TypeSearch";
import WhereSearch from "./WhereSearch";


export default class MatchSearch extends Component {
    constructor(props) {
		super(props);

		this.processFindSubmit = this.processFindSubmit.bind(this);
		this.sanitizeInput = this.sanitizeInput.bind(this);
        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);
        this.processServerFindSuccess = this.processServerFindSuccess.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.setType = this.setType.bind(this);
		this.setWhere = this.setWhere.bind(this);

        this.state = {
			findRequest: {
                requestType: "find",
                match: "",
				type:[],
				where:[],
                limit: 100
            },
			listOfMatches: [],
			modalOpen: false
        };
    }

	render() {
		return (
			<>
				<Button type="submit" className="ml-1" color="primary" onClick={this.processFindSubmit}><BsSearch/></Button>
				<PlacesList modalOpen={this.state.modalOpen} 
							listOfMatches={this.state.listOfMatches}
							toggleModal={this.toggleModal}
							setMarker={this.props.setMarker}/>
				<Container>	
					{this.handleTypeAndWhere()}
				</Container>
			</>	
		);
	}


	handleTypeAndWhere() {
		const typeIsSupported = this.props.checkForFeature('type');
		const whereIsSupported = this.props.checkForFeature('where');

		return (
			<Row className="mt-1">
				{ typeIsSupported && this.renderTypeSearch() }
				{ whereIsSupported && this.renderWhereSearch() }
			</Row>
		);
	}

	renderTypeSearch() {
		return (
			<TypeSearch type={this.state.findRequest.type}
				setType={this.setType}
				serverSettings={this.props.serverSettings}/>
		);
	}

	renderWhereSearch() {
		return (
			<WhereSearch where = {this.state.findRequest.where}
				setWhere = {this.setWhere}
				serverSettings={this.props.serverSettings}/>
		);
	}

	processFindSubmit() {
		const { inputText } = this.props;
        const { findRequest } = this.state;

		this.sanitizeInput(inputText, findRequest);

        if (findRequest.match != null) {
            this.sendFindRequest(findRequest);
			this.toggleModal();
        } 
    }

	sanitizeInput(inputText, findRequest) {
		const regex = /[^a-zA-Z0-9_ ]/gi;

		const sanitizedText = inputText.replace(regex, '_');
		findRequest.match = sanitizedText.trim();

		this.setState({ findRequest });
	}
  	
	sendFindRequest(request) {
		sendServerRequest(request, this.props.serverSettings.serverPort)
			.then(findResponse => {
				if (findResponse) {
					this.processFindResponse(findResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed.", "error");
				}
		    });
	}

	processFindResponse(findResponse) {
		if (!isJsonResponseValid(findResponse, findSchema)) {
			this.processFindRequestError("Find Response Not Valid. Check The Server.");
		} else {
			this.processServerFindSuccess(findResponse);
		}
	}

    processServerFindSuccess(findResponse) {
		LOG.info("Receiving find response from:", findResponse);
		this.setState({listOfMatches: findResponse.places});
	}

	processFindRequestError(message) {
		LOG.error(message);
		this.props.showMessage(message, "error");
	}

	toggleModal() {
        const modalOpen = this.state.modalOpen;
        this.setState({ modalOpen: !modalOpen })
    }

	setType(type){
		const findRequest=this.state.findRequest;
		findRequest.type = type;
		this.setState({findRequest: findRequest});
	}

	setWhere(where){
		const findRequest=this.state.findRequest;
		findRequest.where = where;
		this.setState({findRequest: findRequest});
	}
}
