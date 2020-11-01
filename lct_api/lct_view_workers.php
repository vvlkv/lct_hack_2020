<?php
class Workers{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_workers";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT u.user_id,
       u.surname,
       u.code,
       u.name,
       u.create_dt,
       u.user_state_id,
       u.user_group_id,
       u.lastname,
       u.phone,
       u.pincode,
       ug.name AS user_group_name,
       us.name AS user_state_name,
       uc.ident,
       c.name  AS company_name,
       uc.begin_dt
FROM users u,
     user_groups ug,
     user_states us,
     user_contracts uc,
     companies c
WHERE u.user_group_id = ug.user_group_id
  AND u.user_state_id = us.user_state_id
  AND uc.user_id = u.user_id
  AND uc.company_id = c.id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

