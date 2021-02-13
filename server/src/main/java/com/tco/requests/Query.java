package com.tco.requests;

public class Query {
    private String resultQuery;
    private String match;
    private Integer limit;

    public Query(String match) {
        this.match = match;
    }

    public String getDataQuery() {
        generateStartingSql();

        if (limit != null) {
            resultQuery +=  " Limit " + Integer.toString(limit);
        }

        return resultQuery + ";";
    }

    private void generateStartingSql() {
        if (resultQuery == null) {
            resultQuery = "";
        }
        resultQuery = "SELECT world.name, world.latitude, world.longitude, " 
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, "
                    + "world.home_link FROM world"
                    + resultQuery;
    
        if (match != null && !match.equals("")) {
            resultQuery += " WHERE world.name LIKE '%" + match + "%'";
        }
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
