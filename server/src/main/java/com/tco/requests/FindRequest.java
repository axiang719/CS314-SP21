package com.tco.requests;

import com.tco.Query;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends RequestHeader {
  private String match;
  private Integer limit;
  private Integer found;
  private ArrayList<HashMap<String, String> places;
  private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

  @Override
  public void buildResponse() {
      log.trace("buildResponse -> {}", this);
      populatePlaces();
  }

  public void populatePlaces() {
      Query query = new query(match);
      query.setLimit(limit);
      String dataQuery = query.getDataQuery();
      places = queryDB(dataQuery);
  }
  
  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
  }
}
