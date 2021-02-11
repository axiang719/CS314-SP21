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

  private final static String DB_USER = "cs314-db";
  private final static String DB_PASSWORD = "eiK5liet1uej";

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

  public ResultSet queryDB(String query) {
      ResultSet result = null;
      try {
              Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
              Statement statement = connection.createStatement();
              result = statement.executeQuery(query);
      } catch(Exception e) {
          System.err.println("Exception: " + e.getMessage());
      }

      return result;
  }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
    setUrl();
  }

}
