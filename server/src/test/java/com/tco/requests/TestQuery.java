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
        + "FROM world";
    }

    @Test
    @DisplayName("Testing basic query")
    public void testBasicQuery() {
        Query sql = new Query("");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + ";", resultQuery);
    }
    
    @Test
    @DisplayName("Testing match query")
    public void testMatchQuery() {
        Query sql = new Query("Epps Airpark");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " WHERE world.name LIKE '%Epps Airpark%';", resultQuery);
    }

    @Test
    @DisplayName("Testing query with limit")
    public void testLimitQuery() {
        Query sql = new Query("");
        sql.setLimit(5);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + "ORDER BY RAND() Limit 5;", resultQuery);
    }
}
