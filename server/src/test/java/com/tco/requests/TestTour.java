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

    public void makeLongTour() {
        HashMap<String, String> porlatau = new HashMap<>();
        porlatau.put("latitude", "43.615");
        porlatau.put("longitude", "59.267");
        testPlaces.add(porlatau);
        HashMap<String, String> shakhaman = new HashMap<>();
        shakhaman.put("latitude", "43.22");
        shakhaman.put("longitude", "59.59");
        testPlaces.add(shakhaman);
        HashMap<String, String> karauzyak = new HashMap<>();
        karauzyak.put("latitude", "43.38");
        karauzyak.put("longitude", "59.33");
        testPlaces.add(karauzyak);
        HashMap<String, String> h4airbase = new HashMap<>();
        h4airbase.put("latitude", "32.5392");
        h4airbase.put("longitude", "38.195");
        testPlaces.add(h4airbase);
        HashMap<String, String> brussels = new HashMap<>();
        brussels.put("latitude", "50.913");
        brussels.put("longitude", "4.49");
        testPlaces.add(brussels);
        HashMap<String, String> luxembourg = new HashMap<>();
        luxembourg.put("latitude", "49.61");
        luxembourg.put("longitude", "6.14");
        testPlaces.add(luxembourg);
        HashMap<String, String> mons = new HashMap<>();
        mons.put("latitude", "50.44");
        mons.put("longitude", "3.97");
        testPlaces.add(mons);
        HashMap<String, String> reims = new HashMap<>();
        reims.put("latitude", "49.25");
        reims.put("longitude", "4.06");
        testPlaces.add(reims);
        HashMap<String, String> charleroi = new HashMap<>();
        charleroi.put("latitude", "50.42");
        charleroi.put("longitude", "4.43");
        testPlaces.add(charleroi);
    }
    
    @Test
    @DisplayName("Testing build Matrix")
    public void testBuildMatrix() {
        HashMap<String, String> place = new HashMap<>();
        place.put("latitude", "150.0");
        place.put("longitude", "150.0");

        for (int i=0; i<500; i++) {
            testPlaces.add(place);
        }

        tour = new Tour(8000.0, testPlaces);
        long[][] matrix = tour.buildDistanceMatrix();
        assertEquals(500, matrix.length);
        assertEquals(500, matrix[0].length);
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
        assertEquals(4289, matrix[2][1]);
        assertEquals(0, matrix[1][1]);
    }

    @Test
    @DisplayName("Testing sortTourByDistance")
    public void testSortTourByDistance() {
        makeLongTour();

        Tour originalTour = new Tour(8000.0, testPlaces);
	Tour newTour = new Tour(originalTour.getEarthRadius(), originalTour.getPlaces());
	newTour.sortTourByDistance(0, 0);
	assertTrue(originalTour.size() == newTour.size());
	assertTrue(originalTour.getTourDistance() > newTour.getTourDistance());
    }

    @Test
    @DisplayName("Testing reorderTour") 
    public void testReorderTour() {
        makeLongTour();

        HashMap<String,String> startPlace = testPlaces.get(0);
        Tour T = new Tour(8000.0, testPlaces);
        T.sortTourByDistance(0,0);
        Tour sortedUnorderedTour = T;
        Tour sortedOrderedTour = Tour.reorderTour(T,startPlace);
        assertTrue(sortedUnorderedTour.size() == sortedOrderedTour.size());
        int unorderedDistance = sortedUnorderedTour.getTourDistance().intValue();
        int orderedDistance = sortedOrderedTour.getTourDistance().intValue();
        assertTrue(unorderedDistance == orderedDistance);
    }
} 
