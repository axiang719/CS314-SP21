package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;


public class Database {
    
    private final static String DB_USER = "cs314-db";
    private final static String DB_PASSWORD = "eiK5liet1uej";
    private static String DB_URL;
    
    static String setUrl() {
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        if(useTunnel != null && useTunnel.equals("true")) {
            return "jdbc:mariadb://127.0.0.1:56013/cs314";
        }
        else {
            return "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        }   
    }

    static ResultSet queryDB(String query) {
        DB_URL = setUrl();
        ResultSet result = null;
        try (
            Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement statement = connection.createStatement();
        ) {
            result = statement.executeQuery(query);
        } catch(SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }
        return result;
    }

    static ArrayList<HashMap<String, String>> process(ResultSet result) throws SQLException{
        int index=0;
        ResultSetMetaData meta =  result.getMetaData();
        int columns = meta.getColumnCount();
        ArrayList<HashMap<String,String>> tempPlaces = new ArrayList<HashMap<String, String>>();
        while(result.next()){
            tempPlaces.add(new HashMap<String,String>());
          
            for(int i=1; i < columns; i++){
              
                String key = meta.getColumnName(i);
                String value = result.getString(i);
                tempPlaces.get(index).put(key,value);
                
            }
            index++;
         }
        return tempPlaces;
    }

}
