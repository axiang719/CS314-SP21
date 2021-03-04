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

    // @Test
    // @DisplayName("Check that distances list is filled")
    // public void testDistanceList() {
    //     int expectedDistance = 0;
    //     HashMap<String, String> place = new HashMap<String, String>();
    //     place.put("name", "testPlace");
    //     place.put("latitude", "50");
    //     place.put("longitude", "50");
    //     testPlaces.add(place);
    //     testPlaces.add(place);
    //     ArrayList<Integer> distances = distanceRequest.testDistanceList(testPlaces);
    //     assertEquals(0, distances.get(0));
    //     assertEquals(2, distances.size());
    // }

    // @Test
    // @DisplayName("Test calculateDistance()")
    // public void testCalculateDistance() {
    //     int actual = distanceRequest.testCalcDist();
    //     int expected = 13433;
    //     assertEquals(actual,expected);
    // }

    // @Test
    // @DisplayName("Distance of zero if enter same place twice") 
    // public void testCalculateDistanceZero() {
    //     int actual = distanceRequest.testCalcDistZero();
    //     int expected = 0;
    //     assertEquals(actual,expected);
    // }
}
