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
                + "world.altitude, world.municipality, world.type, "
                + "region.name AS 'region', country.name AS 'country', "
                + "continent.name AS 'continent', world.home_link AS 'url' "
                + "FROM continent "
                + "INNER JOIN country ON continent.id = country.continent "
                + "INNER JOIN region ON country.id = region.iso_country "
                + "INNER JOIN world ON region.id = world.iso_region";
    }

    @Test
    @DisplayName("Testing basic query")
    public void testBasicQuery() {
        Query sql = new Query("");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " ORDER BY RAND();", resultQuery);
    }
    
    @Test
    @DisplayName("Testing match query")
    public void testMatchQuery() {
        Query sql = new Query("Epps Airpark");
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " WHERE country.name LIKE '%Epps Airpark%' "
                    + "OR region.name LIKE '%Epps Airpark%' "
                    + "OR world.name LIKE '%Epps Airpark%' "
                    + "OR world.municipality LIKE '%Epps Airpark%';", resultQuery);
    }

    @Test
    @DisplayName("Testing query with limit")
    public void testLimitQuery() {
        Query sql = new Query("");
        sql.setLimit(5);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " ORDER BY RAND() Limit 5;", resultQuery);
    }

    @Test
    @DisplayName("Testing for query count")
    public void testCountQuery() {
        Query sql = new Query("");
        String resultQuery = sql.getCountQuery();
        assertEquals("SELECT Count(*) AS row_count FROM continent "
                    + "INNER JOIN country ON continent.id = country.continent "
                    + "INNER JOIN region ON country.id = region.iso_country "
                    + "INNER JOIN world ON region.id = world.iso_region "
                    + "ORDER BY RAND();", resultQuery);
    }
}
