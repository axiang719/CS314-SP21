package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


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

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest() {
    this.requestType = "find";
  }
}
