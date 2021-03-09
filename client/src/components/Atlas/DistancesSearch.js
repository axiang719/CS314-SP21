import React, { Component } from 'react';
import { Button, InputGroup, Input, FormFeedback, Container, Row } from 'reactstrap';

import {LOG} from "../../utils/constants";
import * as distancesSchema from "../../../schemas/DistancesResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";
import { LatLngBounds } from 'leaflet';

export default class DistancesSearch extends Component{
   constructor(props){
      super(props);

      this.sendDistancesRequest = this.sendDistancesRequest.bind(this);
      this.processDistancesResponse = this.processDistancesResponse.bind(this);
      this.processDistancesSuccess = this.processDistancesSuccess.bind(this);

      this.state = {
         distancesRequest: {
            requestType: "distances",
            places: [],
            earthRadius: null
         },
         distances: []
      };
   };

   render() {
      return (
         <div/>
      );
   }

   addDistancesArrayElements = (accumulator, currentValue) => accumulator + currentValue;
   
   sumDistances() {
      return this.state.distances.reduce(addDistancesArrayElements);
   }
   
   sendDistancesRequest(request) {
		sendServerRequest(request)
			.then(distancesResponse => {
				if (distancesResponse) {
					this.processDistancesResponse(distancesResponse);
				} else {
					this.props.showMessage("Distances Request To The Server Failed.", "error");
				}
		    });
	}

	processDistancesResponse(distancesResponse) {
		if (!isJsonResponseValid(distancesResponse, distancesSchema)) {
			this.processDistancesRequestError("Distances Response Not Valid. Check The Server.");
		} else {
			this.processDistancesSuccess(distancesResponse);
		}
	}

   processDistancesSuccess(distancesResponse) {
		LOG.info("Receiving distances response from:", getOriginalServerPort());
      const distances = distancesResponse.distances;
		this.setState({ 'distances' : distances });
	}

	processDistancesRequestError(message) {
		LOG.error(message);
		this.props.showMessage(message, "error");
	}
   

} 