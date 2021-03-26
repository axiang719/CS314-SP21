package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;

public class Tour {
	private int earthRadius;
	private int tourDistance;
	private boolean tourDistanceIsDirty;
	private ArrayList<HashMap<String, String>> places;
    
	public Tour(Tour tour) {
		this(tour.getEarthRadius(), tour.getPlaces().clone());
	}

	public Tour(int earthRadius, HashMap<String, String> place) {
		this(earthRadius, new ArrayList<>(place));
	}

	public Tour(int earthRadius, ArrayList<HashMap<String, String>> places) {
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
		HashMap<String, String> start = tempTour.remove(startingIndex);
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
			HashMap<String, String> neighbor = tempTour.getPlaces().at(i);
			double neighborLatitude = Double.parseDouble(neighbor.get(0));
			double neighborLongitude = Double.parseDouble(neighor.get(1));

			DistancesRequest dr = new DistancesRequest();
			dr.setRadius = tour.getEarthRadius();
			int distance = dr.calculateDistance(startLatitude, startLongitude, neighborLatitude, neighborLongitude);
			if(distance < shortestDistance) {
				shortestDistance = distance;
				closestNeighborIndex = i;
			}
			i++;
			neighborIndexDistance++;
		}
		shortTour = new Tour(tour.getEarthRadius(), start);
		shortTour.appendPlace(tempTour.removePlace(closestNeighborIndex));
		return shortTour.appendTour(sortPlacesByDistance(tempTour, i, lookAheadLimit));
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
