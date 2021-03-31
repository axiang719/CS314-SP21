package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends RequestHeader {
  private Double earthRadius;
  private ArrayList<Long> distances;
  private ArrayList<HashMap<String, String>> places;
  private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

  @Override
  public void buildResponse() {
    log.trace("buildResponse -> {}", this);
    fillDistancesList();
  }

  private void fillDistancesList() {
    int size = places.size();
    double previousLatitude = 0;
    double previousLongitude = 0;
    if (size > 1) {
      this.distances = new ArrayList<Long>();
      for(int i=0; i <= size; i++) {
        HashMap<String, String> place = places.get(i % size);
        double latitude = Double.parseDouble(place.get("latitude"));
        double longitude = Double.parseDouble(place.get("longitude"));

        if (i != 0) {
          long resultDistance = calculateDistance(latitude, longitude, previousLatitude, previousLongitude);
          this.distances.add(resultDistance);
        }

        previousLatitude = latitude;
        previousLongitude = longitude;
      }
    }
  }

  public long calculateDistance(double firstPointLat, double firstPointLong, double secondPointLat, double secondPointLong) {
    
    double points []= new double [] {firstPointLat,firstPointLong,secondPointLat,secondPointLong};
    convertToRadians(points);

    double sineLHS = (Math.cos(points[2]) * Math.sin(Math.abs(points[1]-points[3])));
    double sineRHS = ((Math.cos(points[0]) * Math.sin(points[2])) - (Math.sin(points[0]) * Math.cos(points[2]) * 
                          Math.cos(Math.abs(points[1]-points[3]))));
    double sine =  Math.sqrt(Math.pow(sineLHS,2) + Math.pow(sineRHS,2));
   
    double cosLHS = (Math.sin(points[0]) * Math.sin(points[2]));
    double cosRHS =  (Math.cos(points[0]) * Math.cos(points[2]) * Math.cos(Math.abs(points[1]-points[3])));
    double cos =  cosLHS + cosRHS; 

    double deltaSigma =  Math.atan2(sine,cos);
    long distance = (long)Math.round(earthRadius * deltaSigma);
    return distance;
  }

  public double[] convertToRadians(double[] points){
    for(int i=0; i < points.length; i++){
      points[i] = Math.toRadians(points[i]);
    }
    return points;
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public DistancesRequest() {
    this.requestType = "distances";
  }

  public ArrayList<Long> testDistanceList(ArrayList<HashMap<String, String>> places) {
    this.places = places;
    fillDistancesList();
    return this.distances;
  }

  public Double setRadius(double radius) {
    Double d = new Double(radius);
    this.earthRadius = d;
    return d;
  }
}
