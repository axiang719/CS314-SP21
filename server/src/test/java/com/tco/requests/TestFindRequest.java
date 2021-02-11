package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestFindRequest {

    private FindRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new FindRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("DB Connection")
    public void testQueryDB() {
        String query = "SELECT * FROM continent LIMIT 1";
        ResultSet result = conf.queryDB(query);
        String resultString = "";
        try {
            result.first();
            resultString = result.getString("name");
        } catch(SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }
        assertEquals("Africa", resultString);
    }
}
