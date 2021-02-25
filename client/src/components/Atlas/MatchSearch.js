import React, { Component } from 'react';
import { Button, InputGroup, Input, FormFeedback } from 'reactstrap';

import {LOG} from "../../utils/constants";
import * as findSchema from "../../../schemas/FindResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";

export default class MatchSearch extends Component {
    constructor(props) {
		super(props);

		this.processKeywordInput = this.processKeywordInput.bind(this);
		this.processKeywordButton = this.processKeywordButton.bind(this);
        this.sendFindRequest = this.sendFindRequest.bind(this);
        this.processFindResponse = this.processFindResponse.bind(this);
        this.processServerFindSuccess = this.processServerFindSuccess.bind(this);

        this.state = {
			keyword: "",
			findRequest: {
                requestType: "find",
                match: "",
                limit: 100
            },
            listOfMatches: []
        };
    }

	render() {
		const keyword = this.state.keyword;
		const validMatch = this.state.findRequest.match != null;
		const inputBoxEmpty = !keyword;

		return (
			<InputGroup>
                <Input
                    placeholder = "Match"
                    onChange={this.processKeywordInput}
                    value = {keyword}
					valid = {validMatch}
					invalid = {!inputBoxEmpty && !validMatch}
                    />
                    {this.props.renderDropdown()}
                <Button type="submit" className="ml-1" color="primary" onClick={this.processKeywordButton}>Search</Button>
				<FormFeedback>Match string must only contain letters and numbers.</FormFeedback>
            </InputGroup>
		);
	}

	processKeywordInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
        
		this.getMatchOrNull(inputText);
        this.setState({ keyword: inputText});
    }

	getMatchOrNull(matchString) {
		const findRequest = this.state.findRequest;
		const regex = /^[a-zA-Z0-9_ ]*$/;
		const matchIsValid = matchString.match(regex);
		
		if (matchIsValid) {
			findRequest.match = matchString;
		} else {
			findRequest.match = null;
		}

		this.setState({ findRequest: findRequest });

	}

	processKeywordButton() {
        const findRequest = this.state.findRequest;
        if (findRequest.match != null) {
            this.sendFindRequest(findRequest);
			this.props.toggle();
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
		LOG.info("Receiving find response from:", getOriginalServerPort());
		this.props.setListOfMatches(findResponse);
	}

	processFindRequestError(message) {
		LOG.error(message);
		this.props.showMessage(message, "error");
	}

}