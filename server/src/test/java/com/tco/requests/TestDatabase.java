package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public class TestDatabase {
   

    @Test
    @DisplayName("Testing URL")
    public void testUrl() {
        String url = Database.setUrl();
        boolean test = ((url == "jdbc:mariadb://127.0.0.1:56013/cs314") || (url == "jdbc:mariadb://faure.cs.colostate.edu/cs314"));
        assertTrue(test);
    }

    @Test
    @DisplayName("DB Connection")
    public void testQueryDB() {
        String query = "SELECT * FROM continent LIMIT 1";
        ResultSet result = Database.queryDB(query);
        String resultString = "";

        try {
            result.first();
            resultString = result.getString("name");

            result.close();
            assert(result.isClosed());
        } catch(SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }
        assertEquals("Africa", resultString);
    }

    @Test
    @DisplayName("Process method")
    public void testProcess() {
        ArrayList<HashMap<String,String>> place = null;
        String query = "SELECT * FROM continent LIMIT 1";
        
        try 
           
         {
            //System.exit(0);
            ResultSet result = Database.queryDB(query);
            place = Database.process(result);
            result.close();
            
        
        } catch(SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }
    
        //assertEquals(place.get(0).get("name"),"Africa");
        //assertEquals(place.get(0).get("index"),"400001");
    }
}
