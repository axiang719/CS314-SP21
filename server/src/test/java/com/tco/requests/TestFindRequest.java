package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestFindRequest {

    private FindRequest find;

    @BeforeEach
    public void createConfigurationForTestCases() {
        find = new FindRequest();
        find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }
  
    @Test
    @DisplayName("Testing query")
    public void testQuery() {
      String query = find.testQuery();
      assertEquals("SET @phrase='%US%';"
                   + "SELECT world.name, world.latitude, world.longitude, "
                   + "world.id, world.altitude, world.municipality, "
                   + "world.type, world.iso_region, world.iso_country, world.url "
                   + "FROM world WHERE world.name LIKE '%Epps Airpark%' "
                   + "AND world.type LIKE '%small_airport%' AND world.iso_country "
                   + "LIKE @phrase OR world.municipality LIKE @phrase OR "
                   + "world.iso_region LIKE @phrase OR world.continent LIKE "
                   + "@phrase ORDER BY world.name ASC "
                   + "Limit 5;", query);
    }
}
