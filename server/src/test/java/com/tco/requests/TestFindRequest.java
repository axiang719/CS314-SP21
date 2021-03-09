package com.tco.requests;

import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.HashMap;

import jdk.jfr.Timestamp;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestFindRequest {

    private FindRequest find;
    private ArrayList<HashMap<String, String>> testPlaces; 

    @BeforeEach
    public void createConfigurationForTestCases() {
        find = new FindRequest();
        testPlaces = new ArrayList<HashMap<String, String>>();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("test Build Response")
    public void testBuildResponse(){
        
    }

    @Test
    @DisplayName("test Populate Places")
    public void testPopulatePlaces(){
       testPlaces = find.testPopulatePlaces();
       assertEquals(1,testPlaces.size());
    }

    @Test
    @DisplayName("Test Populate Found")
    public void testPopulateFound(){
        
    }
}
