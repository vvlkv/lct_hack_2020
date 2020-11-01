<?php
class View_personal{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_personal";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT personal.personal_id,
       personal.last_name,
       personal.first_name,
       personal.sec_name,
       personal.user_login,
       personal.user_active,
       personal.user_pass
FROM personal;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

