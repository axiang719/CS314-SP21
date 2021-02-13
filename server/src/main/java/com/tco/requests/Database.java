package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Database {
    static String setUrl() {
        String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
        if(useTunnel != null && useTunnel.equals("true")) {
            return "jdbc:mariadb://127.0.0.1:56013/cs314";
        }
        else {
            return "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        }   
    }
}
