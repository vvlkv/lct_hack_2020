<?php
class Worktimes{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_worktimes";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT w.id,
       w.user_id,
       w.object_id,
       w.begin_dt,
       w.end_dt,
       o.name  AS object_name,
       u.name,
       u.surname,
       u.lastname,
       u.user_group_id,
       ug.name AS user_group_name
FROM worktimes w,
     users u,
     objects o,
     user_groups ug
WHERE w.user_id = u.user_id
  AND w.object_id = o.id
  AND u.user_group_id = ug.user_group_id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

