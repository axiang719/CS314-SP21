package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestQuery {

    
    @Test
    @DisplayName("Testing basic query")
    public void testBasicQuery() {
        Query sql = new Query("Epps Airpark");
        String testQuery = sql.getDataQuery();
        assertEquals("SELECT world.name, world.latitude, world.longitude, "
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, world.home_link "
                    + "FROM world WHERE world.name LIKE '%Epps Airpark%';", testQuery);
    }

    @Test
    @DisplayName("Testing query with limit")
    public void testLimitQuery() {
        Query sql = new Query("Epps Airpark");
        sql.setLimit(5);
        String testQuery = sql.getDataQuery();
        assertEquals("SELECT world.name, world.latitude, world.longitude, "
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, world.home_link "
                    + "FROM world WHERE world.name LIKE '%Epps Airpark%' "
                    + "Limit 5;", testQuery);
    }

}
