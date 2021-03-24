package com.tco.requests;

import java.util.Collection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigRequest extends RequestHeader {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;
    private ArrayList<String> where;
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
        features.add("tour");
        validType();
        getWhereDomain();
        log.trace("buildResponse -> {}", this);
    }

    private void getWhereDomain() {
        where = new ArrayList<>();
        Query domainQuery = new Query("");
        String query = domainQuery.getDomainQuery();
        ArrayList<HashMap<String, String>> places = Database.queryDB(query);
        for(HashMap<String, String> place : places) {
            setDomainValues(place);
        }
    }

    private void setDomainValues(HashMap<String, String> place) {
        for(Map.Entry<String, String> currentValue : place.entrySet()) {
            String value = currentValue.getValue();
            if (!where.contains(value)) {
                where.add(value);
            }
        }
    }

    public void validType(){
        type = new ArrayList<String>();
        type.add("airport");
        type.add("heliport");
        type.add("balloonport");
        type.add("other");
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
