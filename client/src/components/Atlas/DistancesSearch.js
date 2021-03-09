import {LOG} from "../../utils/constants";
import * as distancesSchema from "../../../schemas/DistancesResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";
import { LatLngBounds } from 'leaflet';

export default class DistancesSearch {
    var request = {
        requestType: "distances",
        places: [],
        earthRadius: null
    };
    var distances = []

    getDistances() {
        if (distances.length == 0) {
            sendDistancesRequest();
        }
        return this.distances;
    }

    addDistancesArrayElements = (accumulator, currentValue) => accumulator + currentValue;
   
    sumDistances() {
        return this.distances.reduce(addDistancesArrayElements);
    }
   
    sendDistancesRequest() {
	    sendServerRequest(JSON.stringify(request))
		    .then(distancesResponse => {
			    if (distancesResponse) {
				    this.processDistancesResponse(distancesResponse);
				} else {
					LOG.error("Distances Request To The Server Failed.");
				}
		    });
	}

	processDistancesResponse(distancesResponse) {
		if (!isJsonResponseValid(distancesResponse, distancesSchema)) {
			LOG.error("Distances Response Not Valid. Check The Server.");
		} else {
			this.processDistancesSuccess(distancesResponse);
		}
	}

   processDistancesSuccess(distancesResponse) {
       LOG.info("Receiving distances response from:", getOriginalServerPort());
       distances = distancesResponse.distances;
	}
} 
