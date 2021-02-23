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
        generateWhereSql();
        generateLimitSql();
        return resultQuery + ";";
    }

    public String getCountQuery() {
        generateStartCountSql();
        generateWhereSql();
        return resultQuery + ";";
    }

    private void generateStartDataSql() {
        resultQuery = "SELECT world.name, world.latitude, world.longitude, " 
                    + "world.altitude, world.municipality, world.type, "
                    + "region.name AS 'region', country.name AS 'country', "
                    + "continent.name AS 'continent', world.home_link AS 'url' ";
        generateFromSql();
    }

    private void generateStartCountSql() {
        resultQuery = "SELECT Count(*) AS row_count ";
        generateFromSql();
    }

    private void generateFromSql() {
        resultQuery += "FROM continent "
        + "INNER JOIN country ON continent.id = country.continent "
        + "INNER JOIN region ON country.id = region.iso_country "
        + "INNER JOIN world ON region.id = world.iso_region";
    }

    private void generateWhereSql() {
        String key = generateKey();
        if (!key.equals("")) {
            resultQuery += " WHERE country.name LIKE " + key
            + " OR region.name LIKE " + key
            + " OR world.name LIKE " + key
            + " OR world.municipality LIKE " + key;
        }
        else {
            resultQuery += " ORDER BY RAND()";
        }
    }

    private String generateKey() {
        String key = "";
        if (!match.equals("")) {
            key += "'%" + match + "%'";
        }
        return key;
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
