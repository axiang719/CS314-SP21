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

  public static float calculateDistance(float firstPoint, float secondPoint) {
    float maxVal = 0.0f;
    float minVal = 0.0f;
    if (firstPoint > secondPoint) {
      maxVal = firstPoint; 
      minVal = secondPoint;
    }
    else {
      maxVal = secondPoint;
      minVal = firstPoint;
    }    
    return maxVal - minVal;
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistanceRequest() {
    this.requestType = "distance";
  }

  public float testCalculateDistance() {
    float first = 3.0f;
    float second = 1.0f;
    return calculateDistance(first,second);
  }
}
