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
  public static int calculateDistance(float firstPointLatD, float firstPointLongD,
                                      float secondPointLatD, float secondPointLongD) {
    float firstPointLat = (float) (firstPointLatD * (Math.PI/180));
    float firstPointLong = (float) (firstPointLongD * (Math.PI/180));
    float secondPointLat = (float) (secondPointLatD * (Math.PI/180));
    float secondPointLong = (float) (secondPointLongD * (Math.PI/180));
    float vincentPOne = (float) (Math.cos(secondPointLat) * 
                         Math.sin(Math.abs(firstPointLong-secondPointLong)));
    float vincentPTwo = (float) ((Math.cos(firstPointLat) * Math.sin(secondPointLat)) -
                         (Math.sin(firstPointLat) * Math.cos(secondPointLat) * 
                         Math.cos(Math.abs(firstPointLong-secondPointLong))));
    vincentPOne = (float) Math.pow(vincentPOne,2);
    vincentPTwo = (float) Math.pow(vincentPTwo,2);
    float vincentPThree = (float) (Math.sin(firstPointLat) * Math.sin(secondPointLat));
    float vincentPFour = (float) (Math.cos(firstPointLat) * Math.cos(secondPointLat) * 
                          Math.cos(Math.abs(firstPointLong-secondPointLong)));
    float arcTanOne = (float) Math.sqrt(vincentPOne + vincentPTwo);
    float arcTanTwo = (float) vincentPThree + vincentPFour; 
    float angle = (float) Math.atan2(arcTanOne,arcTanTwo);
    int distance = (int) (6371.0f * angle);
    return distance;
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

  public int testCalcDist() {
    float latOne = 40.6f;
    float longOne = -105.1f;
    float latTwo = -33.9f;
    float longTwo = 151.2f;
    return calculateDistance(latOne,longOne,latTwo,longTwo);
  }

  public int testCalcDistZero() {
    return calculateDistance(10.0f,30.0f,10.0f,30.0f);
  }
}
