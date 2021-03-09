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
    private ArrayList<String> type;
    private ArrayList<String> where;

    @BeforeEach
    public void createConfigurationForTestCases() {
        type = new ArrayList<String>();
        where = new ArrayList<String>();
        type.add("Airport");
        where.add("Japan");
        find = new FindRequest("Tokyo", 5, 10, type, where);
        find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = find.getRequestType();
        assertEquals("find", type);
    }
   
    @Test
    @DisplayName("Test that where is being initialized correctly")
    public void testWhere() {
        where = find.getWhere();
        assertEquals("Japan", where);
    }

    @Test
    @DisplayName("Test that match is being initialized correctly")
    public void testMatch() {
        match = find.getMatch();
        assertEquals("Tokyo", match);
    }

    @Test
    @DisplayName("Test that limit is being initialized correctly")
    public void testLimit() {
        limit = find.getLimit();
        assertEquals(5, limit);
    }


}
