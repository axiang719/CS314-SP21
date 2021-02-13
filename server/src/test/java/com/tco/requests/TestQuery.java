package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestQuery {

    private String testQuery;

    @BeforeEach
    public void createConfigurationForTestCases() {
        testQuery = "SELECT world.name, world.latitude, world.longitude, "
        + "world.id, world.altitude, world.municipality, "
        + "world.type, world.iso_region, world.iso_country, world.home_link "
        + "FROM world WHERE world.name LIKE '%Epps Airpark%'";
    }
    
    @Test
    @DisplayName("Testing basic query")
    public void testBasicQuery() {
        Query sql = new Query("Epps Airpark");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + ";", resultQuery);
    }

    @Test
    @DisplayName("Testing query with limit")
    public void testLimitQuery() {
        Query sql = new Query("Epps Airpark");
        sql.setLimit(5);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " Limit 5;", resultQuery);
    }

    @Test
    @DisplayName("Testing query with type")
    public void testTypeQuery() {
        Query sql = new Query("Epps Airpark");
        sql.setType("small_airport");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " AND world.type LIKE '%small_airport%';", resultQuery);
    }
}
