package com.tco.requests;
import java.util.ArrayList;
import java.util.regex.Pattern;

public class Query {
    private String resultQuery;
    private String match;
    private boolean appendFlag = false;
    private ArrayList<String> type;
    private ArrayList<String> where;
    private Integer limit;
    

    public Query(String match) {
        this.match = match;
    }

    public String getDomainQuery() {
        generateDomainSql();
        return resultQuery + ";";
    }

    public String getDataQuery() {
        generateStartDataSql();
        generateMatchSql();
        generateTypeSQL();
        generateWhereSql();
        generateLimitSql();
        return resultQuery + ";";
    }

    public String getCountQuery() {
        generateStartCountSql();
        generateMatchSql();
        generateTypeSQL();
        generateWhereSql();
        return resultQuery + ";";
    }

    private void generateDomainSql() {
        resultQuery = "SELECT country.name AS 'country', region.name AS 'region' "
                    + "FROM country INNER JOIN region ON country.id = region.iso_country";
    }

    private void generateStartDataSql() {
        resultQuery = "SELECT world.name, world.latitude, world.longitude, " 
                    + "world.altitude, world.municipality, world.iata_code, world.type, "
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

    private void generateMatchSql() {
        if (!match.equals("")) {
            String key = "'%" + match + "%'";
            resultQuery += " WHERE (country.name LIKE " + key
            + " OR region.name LIKE " + key
            + " OR world.name LIKE " + key
            + " OR world.municipality LIKE " + key 
            + " OR world.iata_code LIKE " + key + ")";
            appendFlag = true;
        }   
    }

    private void generateWhereSql() {
        if(where != null && !where.isEmpty()){
            if(!appendFlag) {
                resultQuery += " WHERE (";
            } else{
                resultQuery += " AND (";
            }
            for(int i = 0; i < where.size(); i++){
                final String place = "'" + where.get(i) + "'";
                resultQuery += " country.name LIKE " + place
                + " OR region.name LIKE " + place;

                if(i+1 < where.size()){
                    resultQuery += "OR";
                }
            }
            resultQuery += ")";
            appendFlag = true;   
        }    
    }

    private void generateTypeSQL(){
        if(type != null && !type.isEmpty()){
            if(!appendFlag){
                resultQuery += " WHERE (";
            } else{
                resultQuery += " AND (";
            }
            for(int i = 0; i < type.size(); i++){
                if(type.get(i).equals("other")){
                    resultQuery += " world.type NOT LIKE '%airport%' AND"
                                +  " world.type NOT LIKE '%heliport%' AND"
                                +  " world.type NOT LIKE '%balloonport%' ";
                } else{
                    resultQuery += " world.type LIKE '%" + type.get(i) + "%'";
                }
                
                if(i+1 < type.size()){
                  resultQuery += "OR";
                }
            }
            resultQuery += ")";
            appendFlag = true;
        }
    }

    private void generateLimitSql() {
        if(match.equals("")){
            resultQuery += " ORDER BY RAND()";
        }   
        if (limit != null && limit != 0) {
            resultQuery += " Limit " + Integer.toString(limit);
        }
    }
  
    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public void setType(ArrayList<String> type){
        this.type = type;
    }

    public void setWhere(ArrayList<String> where){
        if (where != null) {
            this.where = new ArrayList(where);
            sanitizeStringList(this.where);
        }
    }

    private void sanitizeStringList(ArrayList<String> stringList) {
        for (int i=0; i<stringList.size(); i++) {
            String word = stringList.get(i);
            word = word.replaceAll("[^a-zA-Z0-9]", "_"); 
            stringList.set(i, word);
        }
    }
}
