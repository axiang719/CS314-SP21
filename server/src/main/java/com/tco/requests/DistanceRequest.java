package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
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

 
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistanceRequest() {
    this.requestType = "distance";
  }
}
