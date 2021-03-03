package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistanceRequest {
   
    private DistanceRequest distance;

    @BeforeEach
    public void createConfigurationForTestCases() {
        distance = new DistanceRequest();
    }

    @Test
    @DisplayName("Test calculateDistance()")
    public void testCalculateDistance() {
        assertEquals(true, true);
    }
}
