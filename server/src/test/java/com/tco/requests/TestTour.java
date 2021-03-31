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

    @Test
    @DisplayName("Testing Matrix Distances")
    public void testMatrixDistances() {
        HashMap<String, String> placeOne = new HashMap<>();
        placeOne.put("latitude", "43.615");
        placeOne.put("longitude", "59.267");

        HashMap<String, String> placeTwo = new HashMap<>();
        placeTwo.put("latitude", "32.5392");
        placeTwo.put("longitude", "38.195");

        HashMap<String, String> placeThree = new HashMap<>();
        placeThree.put("latitude", "50.913");
        placeThree.put("longitude", "4.49");

        testPlaces.add(placeOne);
        testPlaces.add(placeTwo);
        testPlaces.add(placeThree);

        tour = new Tour(8000.0, testPlaces);
        long[][] matrix = tour.buildDistanceMatrix();
        assertEquals(2772, matrix[0][1]);
        assertEquals(4289, matrix[1][2]);
        assertEquals(0, matrix[1][1]);
    }

    @Test
    @DisplayName("Testing sortTourByDistance")
    public void testSortTourByDistance() {
        HashMap<String, String> porlatau = new HashMap<>();
        placeOne.put("latitude", "43.615");
        placeOne.put("longitude", "59.267");
        HashMap<String, String> shakhaman = new HashMap<>();
        placeOne.put("latitude", "43.615");
        placeOne.put("longitude", "59.267");
        HashMap<String, String> karauzyak = new HashMap<>();
        placeOne.put("latitude", "43.615");
        placeOne.put("longitude", "59.267");
        HashMap<String, String> h4airbase = new HashMap<>();
        placeTwo.put("latitude", "32.5392");
        placeTwo.put("longitude", "38.195");
        HashMap<String, String> brussels = new HashMap<>();
        placeThree.put("latitude", "50.913");
        placeThree.put("longitude", "4.49");
        HashMap<String, String> luxembourg = new HashMap<>();
        placeThree.put("latitude", "49.61");
        placeThree.put("longitude", "6.14");
        HashMap<String, String> mons = new HashMap<>();
        placeThree.put("latitude", "50.44");
        placeThree.put("longitude", "3.97");
        HashMap<String, String> reims = new HashMap<>();
        placeThree.put("latitude", "49.25");
        placeThree.put("longitude", "4.06");
        HashMap<String, String> charleroi = new HashMap<>();
        placeThree.put("latitude", "50.42");
        placeThree.put("longitude", "4.43");

        testPlaces.add(placeOne);
        testPlaces.add(placeTwo);
        testPlaces.add(placeThree);
    }
} 
