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
    @DisplayName("DB Connection")
    public void testQueryDB() {
        String query = "SELECT * FROM continent LIMIT 1";
        ResultSet result = find.queryDB(query);
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
