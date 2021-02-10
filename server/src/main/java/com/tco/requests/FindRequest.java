package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.mariadb.jdbc; 


public class FindRequest extends RequestHeader {
  private String match;
  private Integer limit;
  private Integer found;
  private ArrayList<String> place;
  private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);


  @Override
  public void buildResponse() {
      match = "";
      place = new ArrayList<String>();
      place.add("find");
      log.trace("buildResponse -> {}", this);
  }

  public String setUrl() {

    private static String DB_URL = "";
    String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");

    if(useTunnel != null && useTunnel.equals("true")) {
      return DB_URL= "jdbc:mariadb://127.0.0.1:56013/cs314";
    }
    else {
      return DB_URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
    }
  }
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
  }

}
