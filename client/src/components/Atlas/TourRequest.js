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

    sendRequest() {
        return sendServerRequest(this.request)
	    .then(response => { 
		if (response) {
		    this.processResponse(response);
		} else {
		    LOG.error("Request To The Server Failed.");
		}
	});
    }

    processResponse(response) {
        if (!isJsonResponseValid(response, schema)) {
	    LOG.error("Tour Response Not Valid. Check The Server.");
	} else {
	    LOG.info("Receiving tour response from:", getOriginalServerPort());
	    this.betterTour = response.places;
	}
   }
} 
