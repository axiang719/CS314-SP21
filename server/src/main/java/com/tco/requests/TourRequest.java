package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
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
      //use ScheduledExecutorService to control exec time
      //Timer and TimerTask could work but are outdated
      //idea is to schedule a stopper method that will
      //stop the execution of sort at a given time,
      //usually after 1 second has passed but it will
      //be able to accept any amount of time passed.
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public TourRequest() {
      this.requestType = "tour";
    }
}
