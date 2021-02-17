package com.tco.requests;

public class Query {
    private String resultQuery;
    private String match;
    private Integer limit;

    public Query(String match) {
        this.match = match;
    }

    public String getDataQuery() {
        generateStartDataSql();
        generateMatchSql();
        generateLimitSql();
        return resultQuery + ";";
    }

    public String getCountQuery() {
        generateStartCountSql();
        generateMatchSql();
        return resultQuery + ";";
    }

    private void generateStartDataSql() {
        resultQuery = "SELECT world.name, world.latitude, world.longitude, " 
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, "
                    + "world.home_link FROM world";
        
        if (!match.equals("")) {
            resultQuery += " WHERE";
        }     
    }

    private void generateStartCountSql() {
        resultQuery = "SELECT Count(*) AS row_count FROM world";
        
        if (!match.equals("")) {
            resultQuery += " WHERE";
        }     
    }

    private void generateMatchSql() {
        if (!match.equals("")) {
            resultQuery += " world.name LIKE '%" + match + "%'";
        }
        else {
            resultQuery += " ORDER BY RAND()";
        }
    }

    private void generateLimitSql() {
        if (limit != null && limit != 0) {
            resultQuery += " Limit " + Integer.toString(limit);
        }
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}