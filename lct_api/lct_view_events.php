<?php
class View_events{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_events";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT e.event_id,
       e.user_id,
       e.event_type_id,
       e.begin_dt,
       e.end_dt,
       e.cft,
       e.event_cost,
       e.event_idle,
       e.object_id,
       o.name  AS object_name,
       c.name  AS company_name,
       et.name AS event_type_name,
       u.name  AS user_name,
       u.surname,
       u.lastname
FROM events e,
     event_types et,
     objects o,
     companies c,
     users u
WHERE e.event_type_id = et.event_type_id
  AND e.user_id = u.user_id
  AND e.object_id = o.id
  AND o.company_id = c.id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

