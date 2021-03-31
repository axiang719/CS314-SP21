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
	private long[][] distanceMatrix;
	private DistancesRequest distancesReq;
    
	public Tour(Double earthRadius, ArrayList<HashMap<String, String>> places) {
		this.earthRadius = earthRadius.doubleValue();
		this.places = places;
		tourDistance = 0;
		tourDistanceIsDirty = true;
		distancesReq = new DistancesRequest(earthRadius);
	}

	public long[][] buildDistanceMatrix() {
		int size = places.size();
		distanceMatrix = new long[size][size];
		for(int colIndex=0; colIndex < size; colIndex++) {
			buildMatrixColumn(size, colIndex, distanceMatrix);
		}

		return distanceMatrix;
	}

	private void buildMatrixColumn(int size, int colIndex, long[][] distanceMatrix) {
		HashMap<String, String> firstPoint = places.get(colIndex);
			
		for(int rowIndex=colIndex; rowIndex < size; rowIndex++) {
			long distance;
			
			if (rowIndex == colIndex) {
				distance = 0;
			} else {
				HashMap<String, String> secondPoint = places.get(rowIndex);
				distance = findDistance(firstPoint, secondPoint);
			}
			
			distanceMatrix[colIndex][rowIndex] = distance;
			distanceMatrix[rowIndex][colIndex] = distance;
		}
	}

	private long findDistance(HashMap<String, String> firstPoint, HashMap<String, String> secondPoint) {
		double firstLatitude = Double.parseDouble(firstPoint.get("latitude"));
		double firstLongitude = Double.parseDouble(firstPoint.get("longitude"));
		double secondLatitude = Double.parseDouble(secondPoint.get("latitude"));
		double secondLongitude = Double.parseDouble(secondPoint.get("longitude"));

		return distancesReq.calculateDistance(firstLatitude, firstLongitude,
													secondLatitude, secondLongitude);
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
		long shortestDistance = Integer.MAX_VALUE;
		int closestNeighborIndex = 0;
		int i = startingIndex;
		for(int neighborIndexDistance = 0; neighborIndexDistance < lookAheadLimit; neighborIndexDistance++, i++) {
			if(i == tour.size()){
				i = 0;
			}
			long distance = getDistance(start, tempTour.getPlaces().get(i));
			if(distance < shortestDistance) {
				shortestDistance = distance;
				closestNeighborIndex = i;
			}
		}
		Tour shortTour = new Tour(tour.getEarthRadius(), new ArrayList());
		shortTour.appendPlace(start);
		shortTour.appendPlace(tempTour.removePlace(closestNeighborIndex));
		shortTour.appendTour(sortTourByDistance(tempTour, i % tempTour.size(), lookAheadLimit));
		if(tour.getTourDistance() > shortTour.getTourDistance()) {
			return tour;
		}
		else {
			return shortTour;
		}
	}

	private static long getDistance(HashMap<String, String> start, HashMap<String, String> end) {
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

	public void setEarthRadius(double radius) {
		earthRadius = radius;
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
		ArrayList<Long> distances = dr.testDistanceList(places);
		for(Long distance:distances) {
			tourDistance += distance.intValue();
		}

		this.tourDistance = tourDistance;
		}
		tourDistanceIsDirty = false;
	}
}
