package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;



public class FindRequest extends RequestHeader {
  private String match;
  private Integer limit;
  private Integer found;
  private ArrayList<String> place;
  private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);
  private transient String DB_URL;


  @Override
  public void buildResponse() {
      match = "";
      place = new ArrayList<String>();
      place.add("find");
      log.trace("buildResponse -> {}", this);
  }

  public void setUrl() {

    String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

    if(useTunnel != null && useTunnel.equals("true")) {
      DB_URL= "jdbc:mariadb://127.0.0.1:56013/cs314";
    }
    else {
      DB_URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
    }
  }

  public String generateQuery(String type = "", String where = "") {
    String query = "SELECT world.name, world.latitude, world.longitude, " 
                   + "world.id, world.altitude, world.municipality, "
                   + "world.type, world.region, world.country, world.url "
                   + "FROM world WHERE world.name LIKE '%" + match + "%' "
                   + "AND world.type LIKE '%" + type + "%' AND world.country, 
                   + "world.municipality, world.region, world.continent LIKE "
                   + "'%" + where + "%' ORDER BY world.name ASC "
                   + "Limit " + Integer.toString(limit) + ";";
    //Query should have 5 parts: requestType, match, type, where, & limit
    return query;
  }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
  }

}
