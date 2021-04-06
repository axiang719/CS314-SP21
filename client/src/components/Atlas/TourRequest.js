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
	    LOG.error("Response Not Valid. Check The Server.");
	} else {
	    LOG.info("Receiving response from:", getOriginalServerPort());
	    this.response = response;
	}
   }
} 
