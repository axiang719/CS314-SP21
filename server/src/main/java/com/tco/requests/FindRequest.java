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

  public String generateQuery() {
    String query = "something";
    //Query should have 5 parts: requestType, match, type, where, & limit
    //Query might just be one long string containing all the useful info
    //Query is probably not the same thing as the JSON passed to the server
    //Are the parts of the query (limit, etc) passed as parameters?
    //Should the query be returned by the method once I'm done with it?
    //What the hell is place? Does it have anything to do with Query? It
    //	does have find in it, does that mean anything?
    //I am so confused and overwhelmed and I'm genuinely trying my best to
    //understand all this but it's just so much, I hope I can actually 
    //accomplish this before 3, I don't want to let my team down.
    //At least I understand this way better than I did 20 minutes ago.
    return query;
  }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
  }

}
