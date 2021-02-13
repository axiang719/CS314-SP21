package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class FindRequest extends RequestHeader {
  private String match;
  private Integer limit;
  private Integer found;
  private ArrayList<String> place;
  private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
  private transient String DB_URL;

  private final static String DB_USER = "cs314-db";
  private final static String DB_PASSWORD = "eiK5liet1uej";

  @Override
  public void buildResponse() {
      match = "";
      place = new ArrayList<String>();
      place.add("find");
      log.trace("buildResponse -> {}", this);
  }

  public String generateQuery(String type, String where) {
    String query = "SET @phrase='%" + where + "%';"
                   + "SELECT world.name, world.latitude, world.longitude, " 
                   + "world.id, world.altitude, world.municipality, "
                   + "world.type, world.iso_region, world.iso_country, "
                   + "world.url FROM world WHERE world.name LIKE '%" + match
                   + "%' AND world.type LIKE '%" + type + "%' AND "
                   + "world.iso_country LIKE @phrase OR world.municipality "
                   + "LIKE @phrase OR world.iso_region LIKE @phrase OR "
                   + "world.continent LIKE @phrase ORDER BY world.name ASC "
                   + "Limit " + Integer.toString(limit) + ";";
    return query;
  }
  
  public ResultSet queryDB(String query) {
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
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";

  }
  
  public String testQuery() {
    this.match = "Epps Airpark";
    this.limit = 5;
    return generateQuery("small_airport","US");
  }

}
