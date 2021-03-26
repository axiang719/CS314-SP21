package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Math;

public class Tour {
	private int tourDistance;
	private boolean tourDistanceIsDirty;
	private ArrayList<HashMap<String, String>> places;
    
	public Tour(ArrayList<HashMap<String, String>> places) {
		this.places = places;
		tourDistance = 0;
		tourDistanceIsDirty = true;
	}

	public void appendPlaces(HashMap<String, String> place) {
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

	public Integer getTourDistance() {
		if(tourDistanceIsDirty) {
			findTourDistance();
		}
		return tourDistance;
	}

	private void findTourDistance() {
		int tourDistance = 0;

		DistancesRequest dr = new DistancesRequest();
		dr.setRadius(6371);
		ArrayList<Integer> distances = dr.testDistanceList(places);
		for(Integer distance:distances) {
			tourDistance += distance.intValue();
		}

		this.tourDistance = tourDistance;
		tourDistanceIsDirty = false;
	}
}
