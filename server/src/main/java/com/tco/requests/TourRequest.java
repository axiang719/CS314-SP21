package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends RequestHeader {
    private Double earthRadius;
    private String response[];
    private ArrayList<HashMap<String, String>> places;
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);
    private boolean sort;
    
    @Override
    public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      sort = true;
      Tour T = new Tour(earthRadius,places);
      private final ScheduledExecutorService s =
      Executors.newScheduledThreadPool(1);
      Runnable stop = () -> { sort = false; }
      ScheduledFuture<?> cancelSort =
      s.schedule(stop,1,SECONDS);
      while(sort) {
        T = T.sortTourByDistance();
      }
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public TourRequest() {
      this.requestType = "tour";
    }
}
