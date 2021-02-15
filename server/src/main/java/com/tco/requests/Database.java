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
    
    private static String setUrl() {
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        if(useTunnel != null && useTunnel.equals("true")) {
            return "jdbc:mariadb://127.0.0.1:56013/cs314";
        }
        else {
            return "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        }   
    }

    static ArrayList<HashMap<String, String>> queryDB(String query) {
        DB_URL = setUrl();
        try (
            Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement statement = connection.createStatement();
            ResultSet result = statement.executeQuery(query);
        ) {
            return process(result);
        } catch(SQLException e) {
            System.err.println("SQLException: " + e.getMessage());
        }

        return null;
    }

    private static ArrayList<HashMap<String, String>> process(ResultSet result) throws SQLException{
        ArrayList<HashMap<String,String>> places = new ArrayList<HashMap<String, String>>();

        ResultSetMetaData meta = result.getMetaData();
        int columns = meta.getColumnCount();
        int index = 0;
        while(result.next()){
            places.add(new HashMap<String,String>());
            for(int i=1; i < columns; i++){
                String key = meta.getColumnName(i);
                String value = result.getString(i);
                places.get(index).put(key,value);
            }
            index++;
         }
        return places;
    }
}
