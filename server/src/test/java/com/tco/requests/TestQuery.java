package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestQuery {

    
    @Test
    @DisplayName("Testing query")
    public void testQuery() {
        Query sql = new Query("Eppis Airpark", 5);
        String testQuery = sql.generateQuery();
        assertEquals("SELECT world.name, world.latitude, world.longitude, "
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, world.url "
                    + "FROM world WHERE world.name LIKE '%Epps Airpark%' "
                    + "Limit 5;", query);
    }
}
