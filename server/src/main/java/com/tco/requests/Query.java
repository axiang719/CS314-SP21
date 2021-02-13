package com.tco.requests;

public class Query {
    private String match;
    private int limit;

    public Query(String match, int limit) {
        this.match = match;
        this.limit = limit;
    }


}
