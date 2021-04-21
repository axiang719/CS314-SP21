import React, { Component } from 'react';
import { Button, InputGroup, Input, FormFeedback, Container, Row } from 'reactstrap';

import PlacesList from "./PlacesList";

import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/FindResponse";
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";
import TypeSearch from "./TypeSearch";
import WhereSearch from "./WhereSearch";


export default class MatchSearch extends Component {
    constructor(props) {
		super(props);

		this.processKeywordInput = this.processKeywordInput.bind(this);
		this.processKeywordButton = this.processKeywordButton.bind(this);
        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);
        this.processServerFindSuccess = this.processServerFindSuccess.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.setType = this.setType.bind(this);
		this.setWhere = this.setWhere.bind(this);
		this.processFocus = this.processFocus.bind(this);

        this.state = {
			keyword: "",
			focus: "match",
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
		const keyword = this.state.keyword;
		const validMatch = this.state.findRequest.match != null;
		const inputBoxEmpty = !keyword;
		const {serverSettings} = this.props;
		const features = serverSettings.serverConfig.features;

		return (
			<div>
				<InputGroup>
					<Input
						placeholder = "Match"
						onFocus = {()=>{this.processFocus("match");}}
						onChange={this.processKeywordInput}
						value = {keyword}
						valid = {validMatch}
						invalid = {!inputBoxEmpty && !validMatch}
						/>
						{this.props.renderDropdown()} 
						<Button type={this.state.focus==="match"?"submit":"button"} className="ml-1" color="primary" onClick={this.processKeywordButton}>Search</Button>
						<FormFeedback>Match string must only contain letters and numbers.</FormFeedback>
				</InputGroup>
				<PlacesList modalOpen={this.state.modalOpen} 
							listOfMatches={this.state.listOfMatches}
							toggleModal={this.toggleModal}
							setMarker={this.props.setMarker}/>
				<Container>	
					<Row className="mt-1">
						{ features.includes("type") && this.renderTypeSearch() }
						{ features.includes("where") && this.renderWhereSearch() }
					</Row>	
				</Container>	
			</div>
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
				processFocus = {this.processFocus}
				focus = {this.state.focus}
				setWhere = {this.setWhere}
				serverSettings={this.props.serverSettings}/>
		);
	}
    
    processKeywordInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        
		this.getMatchOrNull(inputText);
        this.setState({ keyword: inputText});
    }

	processFocus(focus) {
		this.setState({focus});
	}

	getMatchOrNull(matchString) {
		const findRequest = this.state.findRequest;
		const regex = /^[a-zA-Z0-9_ ]*$/;
		const matchIsValid = matchString.match(regex);
		
		if (matchIsValid) {
			findRequest.match = matchString.trim();
		} else {
			findRequest.match = null;
		}

		this.setState({ findRequest: findRequest });

	}

	processKeywordButton() {
        const findRequest = this.state.findRequest;
        if (findRequest.match != null) {
            this.sendFindRequest(findRequest);
			this.toggleModal();
        } 
    }
  	
	sendFindRequest(request) {
		sendServerRequest(request)
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
