package com.tco.requests;

import java.util.ArrayList;

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
                + "world.altitude, world.municipality, world.iata_code, world.type, "
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
        assertEquals(testQuery + " WHERE (country.name LIKE '%Epps Airpark%' "
                    + "OR region.name LIKE '%Epps Airpark%' "
                    + "OR world.name LIKE '%Epps Airpark%' "
                    + "OR world.municipality LIKE '%Epps Airpark%' "
                    + "OR world.iata_code LIKE '%Epps Airpark%');", resultQuery);
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
                    + "INNER JOIN world ON region.id = world.iso_region;", resultQuery);
    }

    @Test
    @DisplayName("Testing for type in query")
    public void testTypeQuery() {
        Query sql = new Query("");
        ArrayList<String> check = new ArrayList<String>();
        check.add("airport");
        sql.setType(check);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " WHERE ( world.type LIKE '%airport%') ORDER BY RAND();", resultQuery );
    }

    @Test
    @DisplayName("Testing for where in query")
    public void testWhereQuery() {
        Query sql = new Query("");
        ArrayList<String> where = new ArrayList<String>();
        where.add("Denver");
        sql.setWhere(where);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " WHERE ( country.name LIKE 'Denver' "
                    + "OR region.name LIKE 'Denver') ORDER BY RAND();", resultQuery);
    }

    @Test
    @DisplayName("Testing for sanitization in query")
    public void testSanatizeQuery() {
        Query sql = new Query("");
        ArrayList<String> where = new ArrayList<String>();
        where.add("Grand&Junction");
        sql.setWhere(where);
        String resultQuery = sql.getDataQuery();
        assertEquals(testQuery + " WHERE ( country.name LIKE 'Grand_Junction' "
                    + "OR region.name LIKE 'Grand_Junction') ORDER BY RAND();", resultQuery);
    }
    
}
