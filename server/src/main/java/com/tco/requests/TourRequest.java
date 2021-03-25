package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
import java.lang.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends RequestHeader {
    private Double earthRadius;
    private String response[];
    private ArrayList<HashMap<String, String>> places;
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);
    
    
    @Override
    public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      //Timer t = new Timer("response time");
      //t.schedule(() -> { sorting goes here }, 1000);
      //give sorting 1 second to execute
      //will need to not be hard-coded time eventually
    }

    public void sort() {
      //this is where the sorting goes
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public TourRequest() {
      this.requestType = "tour";
    }
}
