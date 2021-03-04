package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistanceRequest {

    private DistanceRequest distanceRequest;
    private ArrayList<HashMap<String, String>> testPlaces;

    @BeforeEach
    public void createConfigurationForTestCases() {
        distanceRequest = new DistanceRequest();
        testPlaces = new ArrayList<HashMap<String, String>>();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = distanceRequest.getRequestType();
        assertEquals("distances", type);
    }

    @Test
    @DisplayName("Check that distances list is filled")
    public void testDistanceList() {
        int expectedDistance = 0;
        HashMap<String, String> place = new HashMap<String, String>();
        place.put("name", "testPlace");
        place.put("latitude", "50");
        place.put("longitude", "50");
        testPlaces.add(place);
        testPlaces.add(place);
        ArrayList<Integer> distances = distanceRequest.testDistanceList(testPlaces);
        assertEquals(0, distances.get(0));
        assertEquals(2, distances.size());
    }

    @Test
    @DisplayName("Test calculateDistance()")
    public void testCalculateDistance() {
        int actual = distanceRequest.testCalcDist();
        int expected = 13433;
        assertEquals(actual,expected);
    }
}
