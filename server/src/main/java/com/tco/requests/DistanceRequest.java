package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistanceRequest extends RequestHeader {
  private Float earthRadius;
  private ArrayList<Float> distances;
  private ArrayList<HashMap<String, String>> places;
  private final transient Logger log = LoggerFactory.getLogger(DistanceRequest.class);

  @Override
  public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      
  }

  public static float calculateDistance(float firstPointLat, float firstPointLong,
                                        float secondPointLat, float secondPointLong) {
    float aSquared = Math.abs(Math.abs(firstPointLat) - 
                              Math.abs(secondPointLat));
    aSquared *= aSquared;
    float bSquared = Math.abs(Math.abs(firstPointLong) - 
                              Math.abs(secondPointLong));
    bSquared *= bSquared;
    float cSquared = aSquared + bSquared;
    float retVal = (float) Math.sqrt(cSquared);
    return retVal;
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistanceRequest() {
    this.requestType = "distance";
  }

  public float testCalculateDistance() {
    float firstLat = -5.0f;
    float firstLong = -5.0f;
    float secondLat = -8.0f;
    float secondLong = -9.0f;
    return calculateDistance(firstLat,firstLong,secondLat,secondLong);
  }
}
