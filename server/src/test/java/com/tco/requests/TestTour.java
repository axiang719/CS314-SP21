package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;

public class TestTour {
    private Tour tour;
    ArrayList<HashMap<String, String>> testPlaces;

    @BeforeEach
    public void createConfigurationForTestCases() {
        testPlaces = new ArrayList<HashMap<String, String>>();
    }

    public void testGetEarthRadius(){
        tour.setEarthRadius(10); 
        assertEquals(10, tour.getEarthRadius());
    } 
    
    @Test
    @DisplayName("Testing build Matrix")
    public void testBuildMatrix() {
        HashMap<String, String> place = new HashMap<>();
        place.put("latitude", "150.0");
        place.put("longitude", "150.0");

        for (int i=0; i<5; i++) {
            testPlaces.add(place);
        }

        tour = new Tour(8000.0, testPlaces);
        long[][] matrix = tour.buildDistanceMatrix();
        assertEquals(5, matrix.length);
        assertEquals(5, matrix[0].length);
    }
} 