import {LOG} from "../../utils/constants";
import * as distancesSchema from "../../../schemas/DistancesResponse";
import { isJsonResponseValid, sendServerRequest, getOriginalServerPort } from "../../utils/restfulAPI";
import { LatLngBounds } from 'leaflet';

export default class DistancesSearch {

    constructor(places, earthRadius) {
        this.request = {
            requestType: "distances",
            places: places,
            earthRadius: earthRadius,
        };
        this.distances = []
    }

    getDistances() {
        return this.distances;
    }

    addDistancesArrayElements = (accumulator, currentValue) => accumulator + currentValue;
   
    sumDistances() {
        return this.distances.reduce(addDistancesArrayElements);
    }
   
    sendDistancesRequest() {
	    sendServerRequest(this.request)
		    .then(distancesResponse => {
			    if (distancesResponse) {
				    this.processDistancesResponse(distancesResponse);
				} else {
					LOG.error("Distances Request To The Server Failed.");
				}
                return null
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
       this.distances = distancesResponse.distances;
	}
} 
