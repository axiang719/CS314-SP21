package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;

public class Tour {
	private static double earthRadius;
	private int tourDistance;
	private boolean tourDistanceIsDirty;
	private ArrayList<HashMap<String, String>> places;
    
	public Tour(Double earthRadius, ArrayList<HashMap<String, String>> places) {
		this.earthRadius = earthRadius.doubleValue();
		this.places = places;
		tourDistance = 0;
		tourDistanceIsDirty = true;
	}

	static public Tour sortTourByDistance(Tour tour, int startingIndex, int lookAheadLimit) {
		//base case
		if(tour.size() <= 2) { 
			return tour;
		}
		//recursion case
		Tour tempTour = new Tour(tour.getEarthRadius(), tour.getPlaces());
		HashMap<String, String> start = tempTour.removePlace(startingIndex);
		if(lookAheadLimit == 0 || lookAheadLimit > tempTour.size()) {
			lookAheadLimit = tempTour.size();
		}
		int shortestDistance = Integer.MAX_VALUE;
		int closestNeighborIndex = 0;
		int i = startingIndex;
		for(int neighborIndexDistance = 0; neighborIndexDistance < lookAheadLimit; neighborIndexDistance++) {
			if(i == tour.size()){
				i = 0;
			}
			int distance = getDistance(start, tempTour.getPlaces().get(i));
			if(distance < shortestDistance) {
				shortestDistance = distance;
				closestNeighborIndex = i;
			}
			i++;
		}
		Tour shortTour = new Tour(tour.getEarthRadius(), new ArrayList());
		shortTour.appendPlace(start);
		shortTour.appendPlace(tempTour.removePlace(closestNeighborIndex));
		shortTour.appendTour(sortTourByDistance(tempTour, i, lookAheadLimit));
		if(tour.getTourDistance() > shortTour.getTourDistance()) {
			return tour;
		}
		else {
			return shortTour;
		}
	}

	private static int getDistance(HashMap<String, String> start, HashMap<String, String> end) {
		DistancesRequest dr = new DistancesRequest();
		dr.setRadius(earthRadius);
		double startLatitude = Double.parseDouble(start.get("latitude"));
		double startLongitude = Double.parseDouble(start.get("longitude"));
		double endLatitude = Double.parseDouble(end.get("latitude"));
		double endLongitude = Double.parseDouble(end.get("longitude"));
		return dr.calculateDistance(startLatitude, startLongitude, endLatitude, endLongitude);
	}

	public void appendTour(Tour tour) {
		for(HashMap<String, String> place:tour.getPlaces()) {
			appendPlace(place);
		}
	}

	public void appendPlace(HashMap<String, String> place) {
		places.add(place);
		tourDistanceIsDirty = true;
	}

	public HashMap<String, String> removePlace(int index) {
		HashMap<String, String> place = places.remove(index);
		tourDistanceIsDirty = true;
		return place;
	}

	public double getEarthRadius() {
		return earthRadius;
	}

	public ArrayList<HashMap<String, String>> getPlaces() {
		return places;
	}

	public int size() {
		return places.size();
	}

	public Integer getTourDistance() {
		if(tourDistanceIsDirty) {
			findTourDistance();
		}
		return tourDistance;
	}

	private void findTourDistance() {
		if (places.size() < 2) {
			this.tourDistance = 0;
		}
		else {
		int tourDistance = 0;
		DistancesRequest dr = new DistancesRequest();
		dr.setRadius(earthRadius);
		ArrayList<Integer> distances = dr.testDistanceList(places);
		for(Integer distance:distances) {
			tourDistance += distance.intValue();
		}

		this.tourDistance = tourDistance;
		}
		tourDistanceIsDirty = false;
	}
}
