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
    
	public Tour(Tour tour) {
		this(tour.getEarthRadius(), tour.getPlaces());
	}

	public Tour(double earthRadius, ArrayList<HashMap<String, String>> places) {
		this.earthRadius = earthRadius;
		this.places = places;
		tourDistance = 0;
		tourDistanceIsDirty = true;
	}

	static public Tour sortPlacesByDistance(Tour tour, int startingIndex, int lookAheadLimit) {
		//base case
		if(tour.size() <= 2) { 
			return tour;
		}
		//recursion case
		Tour tempTour = new Tour(tour);
		HashMap<String, String> start = tempTour.removePlace(startingIndex);
		double startLatitude = Double.parseDouble(start.get(0));
		double startLongitude = Double.parseDouble(start.get(1));
		if(lookAheadLimit == 0 || lookAheadLimit > tour.size()) {
			lookAheadLimit = tour.size();
		}
		int shortestDistance = Integer.MAX_VALUE;
		int closestNeighborIndex = 0;
		int neighborIndexDistance = 0;
		int i = startingIndex;
		while(neighborIndexDistance < lookAheadLimit) {
			if(i == tour.size()){
				i = 0;
			}
			HashMap<String, String> neighbor = tempTour.getPlaces().get(i);
			double neighborLatitude = Double.parseDouble(neighbor.get(0));
			double neighborLongitude = Double.parseDouble(neighbor.get(1));

			DistancesRequest dr = new DistancesRequest();
			dr.setRadius(earthRadius);
			int distance = dr.calculateDistance(startLatitude, startLongitude, neighborLatitude, neighborLongitude);
			if(distance < shortestDistance) {
				shortestDistance = distance;
				closestNeighborIndex = i;
			}
			i++;
			neighborIndexDistance++;
		}
		Tour shortTour = new Tour(tour.getEarthRadius(), new ArrayList());
		shortTour.appendPlace(start);
		shortTour.appendPlace(tempTour.removePlace(closestNeighborIndex));
		shortTour.appendTour(sortPlacesByDistance(tempTour, i, lookAheadLimit));
		if(tour.getTourDistance() > shortTour.getTourDistance()) {
			return tour;
		}
		else {
			return shortTour;
		}
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
		int tourDistance = 0;

		DistancesRequest dr = new DistancesRequest();
		dr.setRadius(earthRadius);
		ArrayList<Integer> distances = dr.testDistanceList(places);
		for(Integer distance:distances) {
			tourDistance += distance.intValue();
		}

		this.tourDistance = tourDistance;
		tourDistanceIsDirty = false;
	}
}
