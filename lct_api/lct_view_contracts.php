<?php
class Contracts{
 
    // database connection and table name
    private $conn;
    private $table_name = "api_contracts";

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
function read(){
 
    // select all query
    $query = "SELECT cc.client_contract_id,
       cc.client_id,
       cc.contract_type_id,
       cc.contract_state_id,
       cc.ident,
       cc.begin_dt,
       cc.end_dt,
       cc.done_dt,
       cs.name AS state_name,
       ct.name AS type_name
FROM client_contracts cc,
     contract_states cs,
     contract_types ct
WHERE cc.contract_state_id = cs.contract_state_id
  AND cc.contract_type_id = ct.contract_type_id;";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

}

