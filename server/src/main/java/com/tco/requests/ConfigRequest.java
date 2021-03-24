package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigRequest extends RequestHeader {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;
    private ArrayList<String> type;

    @Override
    public void buildResponse() {
        serverName = "t13 The Epic Gamers";
        features = new ArrayList<String>();
        features.add("config");
        features.add("find");
        features.add("type");
        features.add("where");
        features.add("distances");
        validType();
        log.trace("buildResponse -> {}", this);
    }

    public ArrayList<String> validType(){
        type = new ArrayList<String>();
        type.add("airport");
        type.add("heliport");
        type.add("balloonport");
        type.add("other");
        return type;
       
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }
}
