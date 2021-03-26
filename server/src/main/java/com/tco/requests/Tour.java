package com.tco.requests;

import com.tco.requests.*;
import java.util.ArrayList;
import java.lang.Math;

public class Tour {
	private int TourDistance;
	private ArrayList<HashMap<String, String>> places;
    
	public Tour(ArrayList<HashMap<String, String>> places) {
		this.places = places;
	}

	public ArrayList<HashMap<String, String>> getPlaces() {
		return places;
	}

	public int getTourDistance() {
		return TourDistance;
	}
}
