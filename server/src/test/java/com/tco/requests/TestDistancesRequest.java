package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistancesRequest {

    private DistancesRequest distancesRequest;
    private ArrayList<HashMap<String, String>> testPlaces; 

    @BeforeEach
    public void createConfigurationForTestCases() {
        distancesRequest = new DistancesRequest();
        testPlaces = new ArrayList<HashMap<String, String>>();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = distancesRequest.getRequestType();
        assertEquals("distances", type);
    }

    @Test
    @DisplayName("Check that distances list is filled")
    public void testDistanceList() {
        distancesRequest.setRadius(6378);
        int expectedDistance = 0;
        HashMap<String, String> place = new HashMap<String, String>();
        place.put("name", "testPlace");
        place.put("latitude", "50");
        place.put("longitude", "50");
        testPlaces.add(place);
        testPlaces.add(place);
        ArrayList<Integer> distances = distancesRequest.testDistanceList(testPlaces);
        assertEquals(0, distances.get(0));
        assertEquals(2, distances.size());
    }

    @Test
    @DisplayName("Test calculateDistances()")
    public void testCalculateDistance() {
        distancesRequest.setRadius(6378);
        int expected = 13448;
        assertEquals(distancesRequest.calculateDistance(40.6, -105.1, -33.9, 151.2), expected);
    }

    @Test
    @DisplayName("Distance of zero if enter same place twice") 
    public void testCalculateDistanceZero() {
        distancesRequest.setRadius(0);
        assertEquals(0, distancesRequest.calculateDistance(40, 41, 42, 45));
    }

    @Test
    @DisplayName("Test setRadius")
    public void testSetRadius() {
        assertEquals(100, distancesRequest.setRadius(100));
    }
}
