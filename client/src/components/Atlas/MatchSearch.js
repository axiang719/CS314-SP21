import React, { Component } from 'react';
import { Button, InputGroup, Input } from 'reactstrap';

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

		return (
			<InputGroup>
                <Input
                    placeholder = "Keyword"
                    onChange={this.processKeywordInput}
                    value = {keyword}
					valid = {validMatch}
					invalid = {!validMatch}
                    />
                    {this.props.renderDropdown()}
                <Button className="ml-1" color="primary" onClick={this.processKeywordButton}>Search</Button>
            </InputGroup>
		);
	}

	processKeywordInput(onChangeEvent) {
        const inputText = onChangeEvent.target.value;
		const findRequest = this.state.findRequest;
		findRequest.match = inputText;
        
        this.setState({ keyword: inputText, findRequest: findRequest});
    }

	processKeywordButton() {
        const findRequest = this.state.findRequest;
        if (findRequest.match != null) {
            this.sendFindRequest(findRequest);
        } 
    }
  	
	sendFindRequest(request) {
		sendServerRequest(request)
			.then(findResponse => {
				if (findResponse) {
					this.processFindResponse(findResponse);
				} else {
					this.props.showMessage("The Request To The Server Failed. Please Try Again Later.", "error");
				}
		    });
	}

	processFindResponse(findResponse) {
		if (!isJsonResponseValid(findResponse, findSchema)) {
			this.processServerConfigError("Find Response Not Valid. Check The Server.");
		} else {
			this.processServerFindSuccess(findResponse);
		}
	}

    processServerFindSuccess(findResponse) {
		LOG.info("Receiving find response from:", getOriginalServerPort());
		this.props.setListOfMatches(findResponse);
	}
}