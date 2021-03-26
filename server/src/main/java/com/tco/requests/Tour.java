package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
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

	public ArrayList<HashMap<String, String>> getPlaces() {
		return places;
	}

	public Integer getTourDistance() {
		if(TourDistanceIsDirty) {
			findTourDistance()
		}
		return TourDistance;
	}

	private void findTourDistance() {
		int tourDistance = 0;

		DistanceRequest dr = new DistanceRequest;
		dr.setRadius(6371);
		ArrayList<Integer> distances = dr.testDistancesList(places);
		for(Integer distance:distances) {
			tourDistance += distance.intValue();
		}

		this.tourDistance = tourDistance;
		tourDistanceIsDirty = false;
	}
}
