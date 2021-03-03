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
    this.distances = new ArrayList<Integer>();
    int size = places.size();
    float previousLatitude = 0;
    float previousLongitude = 0;

    for(int i=0; i <= size; i++) {
      HashMap<String, String> place = places.get(i % size);
      float latitude = Float.parseFloat(place.get("latitude"));
      float longitude = Float.parseFloat(place.get("longitude"));

      if (i != 0) {
        int resultDistance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude); //TODO Add call to distance function here. Replace 0 with results.
        this.distances.add(resultDistance);
      }

      previousLatitude = latitude;
      previousLongitude = longitude;
    }
  }

  //check for if one is negative and other positive
  public static int calculateDistance(float firstPointLat, float firstPointLong,
                                        float secondPointLat, float secondPointLong) {
    float aSquared = checkSigns(firstPointLat,secondPointLat);
    float bSquared = checkSigns(firstPointLong,secondPointLong);
    float cSquared = aSquared + bSquared;              //use pythagorean theorem to find distance
    int retVal = (int) Math.sqrt(cSquared);
    return retVal;
  }

  public static float checkSigns(float fOne, float fTwo) {
    float retVal = 0.0f;
    String strOne = String.valueOf(fOne);               //detect negative by converting float to string
    String strTwo = String.valueOf(fTwo);               //and check if first char is minus sign
    if (!(strOne.charAt(0) == '-' && strTwo.charAt(0) == '-') &&  //use exclusive or to check if only
        (strOne.charAt(0) == '-' || strTwo.charAt(0) == '-')) {  //one of the two is negative
      retVal = Math.abs(fOne) + Math.abs(fTwo);
    }
    else {
      retVal = Math.abs(fOne) - Math.abs(fTwo);
    }
    retVal *= retVal;
    return retVal;  
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
    float firstLat = 3.0f;
    float firstLong = 2.0f;
    float secondLat = -1.0f;
    float secondLong = -1.0f;
    return calculateDistance(firstLat,firstLong,secondLat,secondLong);
  }
}
