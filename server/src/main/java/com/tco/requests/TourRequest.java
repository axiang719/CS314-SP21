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
    private transient boolean sort;

    @Override
    public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      setTimer();
    }

    public void setTimer() {
      Tour T = new Tour(earthRadius,places);
      double d = Double.parseDouble(response);
      if (d != 0.0 && response != "") {
        T = sort(d,T);
      }
      this.places = T.getPlaces();
    }

    public Tour sort(double d, Tour T) {
      sort = true;
      int time = (int) (d * 1000.0);
      time -= (time / 2); 
      Timer t = new Timer();
      TimerTask task = new TimerTask() {
        public void run() {
          sort = false;
        }
      };
      t.schedule(task,time);
      int i = 0;
      while(sort) {
        T = T.sortTourByDistance(T,i,0);
        i += 1;
        if (i >= places.size()) break;
      }
      return T;
    }
    
    /* The following methods exist only for testing purposes and are not used
    during normal execution, including the constructor. */

    public TourRequest() {
      this.requestType = "tour";
    }
}
