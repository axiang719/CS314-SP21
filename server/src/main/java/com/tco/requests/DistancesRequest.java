package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends RequestHeader {
  private Double earthRadius;
  private ArrayList<Long> distances;
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
      this.distances = new ArrayList<Long>();
      for(int i=0; i <= size; i++) {
        HashMap<String, String> place = places.get(i % size);
        double latitude = Double.parseDouble(place.get("latitude"));
        double longitude = Double.parseDouble(place.get("longitude"));

        if (i != 0) {
          long resultDistance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude);
          this.distances.add(resultDistance);
        }

        previousLatitude = latitude;
        previousLongitude = longitude;
      }
    }
    else if (size == 1) {
      this.distances = new ArrayList<Long>();
      distances.add(0L);
    }
  }

  public long calculateDistance(double firstPointLatD, double firstPointLongD,
                              double secondPointLatD, double secondPointLongD) {
    double firstPointLat = Math.toRadians(firstPointLatD);
    double firstPointLong =  Math.toRadians(firstPointLongD);
    double secondPointLat = Math.toRadians(secondPointLatD);
    double secondPointLong = Math.toRadians(secondPointLongD);
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
    long distance = (long)Math.round(earthRadius * angle);
    return distance;
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistancesRequest() {
    this.requestType = "distances";
  }

  public ArrayList<Long> testDistanceList(ArrayList<HashMap<String, String>> places) {
    this.places = places;
    fillDistancesList();
    return this.distances;
  }

  public Double setRadius(double radius) {
    Double d = new Double(radius);
    this.earthRadius = d;
    return d;
  }
}
