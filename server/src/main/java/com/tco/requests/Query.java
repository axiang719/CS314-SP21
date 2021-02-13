package com.tco.requests;

public class Query {
    private String resultQuery;
    private String match;
    private Integer limit;
    private String type;

    public Query(String match) {
        this.match = match;
    }

    public String getDataQuery() {
        generateStartDataSql();
        generateTypeSql();

        if (limit != null) {
            resultQuery += " Limit " + Integer.toString(limit);
        }

        return resultQuery + ";";
    }

    private void generateStartDataSql() {
        resultQuery = "SELECT world.name, world.latitude, world.longitude, " 
                    + "world.id, world.altitude, world.municipality, "
                    + "world.type, world.iso_region, world.iso_country, "
                    + "world.home_link FROM world";

        if (match != null && !match.equals("")) {
            resultQuery += " WHERE world.name LIKE '%" + match + "%'";
        }
    }

    private void generateTypeSql() {
        if (type != null && !type.equals("")) {
            resultQuery += " AND world.type LIKE '%" + type + "%'";
        }
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public void setType(String type) {
        this.type = type;
    }
}
