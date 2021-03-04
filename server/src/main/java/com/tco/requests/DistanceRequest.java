package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
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
    int size = places.size();
    float previousLatitude = 0;
    float previousLongitude = 0;
    if (size > 1) {
      this.distances = new ArrayList<Integer>();
      for(int i=0; i <= size; i++) {
        HashMap<String, String> place = places.get(i % size);
        float latitude = Float.parseFloat(place.get("latitude"));
        float longitude = Float.parseFloat(place.get("longitude"));

        if (i != 0) {
          int resultDistance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude);
          this.distances.add(resultDistance);
        }

        previousLatitude = latitude;
        previousLongitude = longitude;
      }
    }
  }

  //check for if one is negative and other positive
  public static int calculateDistance(double firstPointLat, double firstPointLong,
                                      double secondPointLat, double secondPointLong) {
    double vincentPOne = Math.pow(Math.cos(secondPointLat) * 
                         Math.sin(Math.abs(firstPointLong-secondPointLong)),2);
    double vincentPTwo = (Math.cos(firstPointLat) * Math.sin(secondPointLat)) - 
                         (Math.sin(firstPointLat) * Math.cos(secondPointLat) * 
                         Math.cos(Math.abs(firstPointLong+secondPointLong)));
    vincentPTwo = Math.pow(vincentPTwo, 2);
    double arcTanOne = vincentPOne + vincentPTwo;
    double arcTanTwo = 1.0; //TODO
    double angle = Math.atan2(arcTanOne,arcTanTwo);
    return 0;
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

  public int testCalculateDistance() {
    return -1;
  }
}
