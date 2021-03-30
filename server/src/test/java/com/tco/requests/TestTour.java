package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestTour {
    private Tour tour;

    public void testGetEarthRadius(){
        tour.setEarthRadius(10); 
        assertEquals(10, tour.getEarthRadius());
    }  
} 