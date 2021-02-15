package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

public class TestDatabase {
   
    @Test
    @DisplayName("Test Query")
    public void testQueryDB() {
        ArrayList<HashMap<String,String>> place = null;
        String query = "SELECT * FROM continent LIMIT 1";
        place = Database.queryDB(query);

        assertEquals(place.get(0).get("name"),"Africa");
        assertEquals(place.get(0).get("index"),"400001");
    }
}
