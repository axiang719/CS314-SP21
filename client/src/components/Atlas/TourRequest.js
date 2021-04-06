import {LOG} from "../../utils/constants";
import * as tourSchema from "../../../schemas/TourResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";

export default class TourRequest {

    constructor(places, earthRadius) {
        this.request = {
            requestType: "distances",
            places: places,
            earthRadius: earthRadius,
        };
        this.response = null;
    }

    sendDistancesRequest() {
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
        if (!isJsonResponseValid(distancesResponse, distancesSchema)) {
	    LOG.error("Distances Response Not Valid. Check The Server.");
	} else {
	    LOG.info("Receiving distances response from:", getOriginalServerPort());
	    this.response = response;
	}
   }
} 
