<?php
class Wire_types{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_wire_types";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT wire_types.wire_type_code,
       wire_types.name,
       wire_types.remark
FROM wire_types;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

