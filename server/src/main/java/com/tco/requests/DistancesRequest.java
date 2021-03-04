package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends RequestHeader {
  private Double earthRadius;
  private ArrayList<Integer> distances;
  private ArrayList<HashMap<String, String>> places;
  private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

  @Override
  public void buildResponse() {
    log.trace("buildResponse -> {}", this);
    fillDistancesList();
  }

  private void fillDistancesList() {
    int size = places.size();
    double previousLatitude = 0;
    double previousLongitude = 0;
    if (size > 1) {
      this.distances = new ArrayList<Integer>();
      for(int i=0; i <= size; i++) {
        HashMap<String, String> place = places.get(i % size);
        double latitude = Double.parseDouble(place.get("latitude"));
        double longitude = Double.parseDouble(place.get("longitude"));

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
  public int calculateDistance(double firstPointLatD, double firstPointLongD,
                              double secondPointLatD, double secondPointLongD) {
    double firstPointLat = (firstPointLatD * (Math.PI/180));
    double firstPointLong =  (firstPointLongD * (Math.PI/180));
    double secondPointLat = (secondPointLatD * (Math.PI/180));
    double secondPointLong = (secondPointLongD * (Math.PI/180));
    double vincentPOne = (Math.cos(secondPointLat) * 
                         Math.sin(Math.abs(firstPointLong-secondPointLong)));
    double vincentPTwo = ((Math.cos(firstPointLat) * Math.sin(secondPointLat)) -
                         (Math.sin(firstPointLat) * Math.cos(secondPointLat) * 
                         Math.cos(Math.abs(firstPointLong-secondPointLong))));
    vincentPOne =  Math.pow(vincentPOne,2);
    vincentPTwo =  Math.pow(vincentPTwo,2);
    double vincentPThree = (Math.sin(firstPointLat) * Math.sin(secondPointLat));
    double vincentPFour =  (Math.cos(firstPointLat) * Math.cos(secondPointLat) * 
                          Math.cos(Math.abs(firstPointLong-secondPointLong)));
    double arcTanOne =  Math.sqrt(vincentPOne + vincentPTwo);
    double arcTanTwo =  vincentPThree + vincentPFour; 
    double angle =  Math.atan2(arcTanOne,arcTanTwo);
    int distance = (int)Math.round(earthRadius * angle);
    return distance;
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistancesRequest() {
    this.requestType = "distances";
  }

  public ArrayList<Integer> testDistanceList(ArrayList<HashMap<String, String>> places) {
    this.places = places;
    fillDistancesList();
    return this.distances;
  }

  public int testCalcDist() {
    double latOne = 40.6f;
    double longOne = -105.1f;
    double latTwo = -33.9f;
    double longTwo = 151.2f;
    return calculateDistance(latOne,longOne,latTwo,longTwo);
  }

  public int testCalcDistZero() {
    return calculateDistance(10.0f,30.0f,10.0f,30.0f);
  }
}
