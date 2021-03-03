package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistanceRequest extends RequestHeader {
  private Float earthRadius;
  private ArrayList<Integer> distances;
  private ArrayList<HashMap<String, String>> places;
  private final transient Logger log = LoggerFactory.getLogger(DistanceRequest.class);

  @Override
  public void buildResponse() {
    log.trace("buildResponse -> {}", this);
    fillDistancesList();
  }

  private void fillDistancesList() {
    this.distances = new ArrayList<Integer>();
    int size = places.size();
    float previousLatitude;
    float previousLongitude;

    for(int i=0; i <= size; i++) {
      HashMap<String, String> place = places.get(i % size);
      float latitude = Float.parseFloat(place.get("latitude"));
      float longitude = Float.parseFloat(place.get("longitude"));

      if (i != 0) {
        int resultDistance = 0; //TODO Add call to distance function here. Replace 0 with results.
        this.distances.add(resultDistance);
      }

      previousLatitude = latitude;
      previousLongitude = longitude;
    }
  }

  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistanceRequest() {
    this.requestType = "distances";
  }

  public ArrayList<Integer> testDistanceList(ArrayList<HashMap<String, String>> places) {
    this.places = places;
    fillDistancesList();
    return this.distances;
  }
}
