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
		places.trimToSize();
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

	public void sortTourByDistance(int startingIndex, int lookAheadLimit) {
		Tour unvisitedPlaces = new Tour(getEarthRadius(), getPlaces());
		Tour visitedPlaces = new Tour(getEarthRadius(), new ArrayList(this.size()));
		travelingSalesman(unvisitedPlaces, visitedPlaces, startingIndex, lookAheadLimit);
		places = visitedPlaces.getPlaces();
	}

	// heuristic traveling salesman solver
	private void travelingSalesman(Tour unvisitedPlaces, Tour visitedPlaces, int startingIndex, int lookAheadLimit) {
		//base case
		if(unvisitedPlaces.size() <= 2) { 
			visitedPlaces.appendTour(unvisitedPlaces);
		}
		//recursion case
		if(lookAheadLimit == 0 || lookAheadLimit > size()) {
			lookAheadLimit = size();
		}
		HashMap<String, String> start = unvisitedPlaces.removePlace(startingIndex);
		visitedPlaces.appendPlace(start);
		int nearestNeighborIndex = unvisitedPlaces.getNearestNeighbor(start, startingIndex, lookAheadLimit);
		travelingSalesman(unvisitedPlaces, visitedPlaces, nearestNeighborIndex, lookAheadLimit);
	}
	
	private int getNearestNeighbor(HashMap<String, String> start, int startingIndex, int lookAheadLimit) {
		int nearestNeighborIndex = 0;
		int i = startingIndex;
		long shortestDistance = Integer.MAX_VALUE;
		for(int neighborIndexDistance = 0; neighborIndexDistance < lookAheadLimit; neighborIndexDistance++, i++) {
			if(i == size()){
				i = 0;
			}
			long distance = findDistance(start, getPlaces().get(i));
			if(distance < shortestDistance) {
				shortestDistance = distance;
				nearestNeighborIndex = i;
			}
		}
		return nearestNeighborIndex;
	}

	public void appendTour(Tour tour) {
		for(HashMap<String, String> place:tour.getPlaces()) {
			appendPlace(place);
		}
		tourDistanceIsDirty = true;
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
		return (ArrayList) places.clone();
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

	public static Tour reorderTour(Tour T, HashMap<String,String> startPlace) {
		ArrayList<HashMap<String,String>> tPlaces = T.getPlaces();
		String startLat = startPlace.get("latitude");
		String startLon = startPlace.get("longitude");
		int size = tPlaces.size();
		while (tPlaces.get(0).get("latitude") != startLat &&
			   tPlaces.get(0).get("longitude") != startLon) {
			for (int i = 0; i < size-1; i++) {
				int iPlusOne = (i+1) % size;
				HashMap<String,String> temp = tPlaces.get(iPlusOne);
				tPlaces.set(iPlusOne,tPlaces.get(i));
				tPlaces.set(i,temp);
			}
		}
		T.places = tPlaces;
		return T;
	}
}
