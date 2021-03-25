package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestTourRequest {
    private TourRequest tourRequest;

    @BeforeEach
    public void createConfigurationForTestCases() {
        tourRequest = new TourRequest();
    }

    @Test
    @DisplayName("Request type is \"tour\"")
    public void testType() {
        String type = tourRequest.getRequestType();
        assertEquals("tour", type);
    }

}