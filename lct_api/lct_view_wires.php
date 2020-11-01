<?php
class Wires{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_wires";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT w.wire_id,
       w.client_id,
       w.wire_type_code,
       w.name,
       w.lat,
       w.lon,
       w.address_str,
       w.create_dt,
       w.begin_dt,
       w.end_dt,
       w.is_active,
       w.remark,
       wt.name AS wire_type_name,
       c.name  AS client_name
FROM wires w,
     wire_types wt,
     clients c
WHERE w.wire_type_code = wt.wire_type_code
  AND w.client_id = c.client_id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

