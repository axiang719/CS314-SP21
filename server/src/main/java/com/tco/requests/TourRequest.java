package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends RequestHeader {
    private Double earthRadius;
    private String response;
    private ArrayList<HashMap<String, String>> places;
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);
    private boolean sort;

    @Override
    public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      setTimer();
    }

    public void setTimer() {
      sort = true;
      double d = Double.parseDouble(response);
      int time = (int) d * 1000;
      Timer t = new Timer();
      TimerTask task = new TimerTask() {
        public void run() {
          sort = false;
        }
      };
      t.schedule(task,time);
      Tour T = new Tour(earthRadius,places);
      int i = 0;
      while(sort) {
        T = T.sortTourByDistance(T,i,0);
        i += 1;
      }
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public TourRequest() {
      this.requestType = "tour";
    }
}
