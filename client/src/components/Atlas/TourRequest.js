import {LOG} from "../../utils/constants";
import * as schema from "../../../schemas/TourResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";

export default class TourRequest {

    constructor(places, earthRadius) {
        this.request = {
            requestType: "tour",
            earthRadius: earthRadius,
	        response: 1,
            places: places
        };
        this.betterTour = []

    }

    getPlaces() {
        return this.betterTour;
    }

    sendRequest(serverPort) {
        console.log(serverPort);
        return sendServerRequest(this.request,serverPort)
	    .then(response => { 
		if (response) {
		    this.processResponse(response, serverPort);
		} else {
		    LOG.error("Request To The Server Failed.");
		}
	});
    }

    processResponse(response,serverPort) {
        if (!isJsonResponseValid(response, schema)) {
	    LOG.error("Tour Response Not Valid. Check The Server.");
	} else {
	    LOG.info("Receiving tour response from:",serverPort);
	    this.betterTour = response.places;
	}
   }
} 
