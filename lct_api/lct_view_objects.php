<?php
class Objects{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_objects";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT o.id,
       o.name,
       o.company_id,
       o.polygon_lat1,
       o.polygon_lon1,
       o.polygon_lat2,
       o.polygon_lon2,
       o.polygon_lat3,
       o.polygon_lon3,
       o.polygon_lat4,
       o.polygon_lon5,
       o.address_str,
       o.begin_dt,
       o.end_dt,
       o.timetable,
       c.name AS company_name
FROM objects o,
     companies c
WHERE o.company_id = c.id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

