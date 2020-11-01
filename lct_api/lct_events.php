<?php
class Events{
 
    // database connection and table name
    private $conn;
    private $table_name = "events";
 
    // object properties
    public $event_id;
    public $user_id;
    public $event_type_id;
    public $begin_dt;
    public $end_dt;
    public $cft;
	public $event_cost;
    public $event_idle;
    public $object_id;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read events
function read(){
 
    // select all query
    $query = "SELECT *
                FROM " . $this->table_name;
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}


// create events
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
              SET event_id=:event_id, user_id=:user_id, event_type_id=:event_type_id, begin_dt=:begin_dt, end_dt=:end_dt, 
			      cft=:cft, event_cost=:event_cost, event_idle=:event_idle,
			      object_id=:object_id";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->event_id=htmlspecialchars(strip_tags($this->event_id));
    $this->user_id=htmlspecialchars(strip_tags($this->user_id));
    $this->event_type_id=htmlspecialchars(strip_tags($this->event_type_id));
    $this->begin_dt=htmlspecialchars(strip_tags($this->begin_dt));
    $this->end_dt=htmlspecialchars(strip_tags($this->end_dt));
    $this->cft=htmlspecialchars(strip_tags($this->cft));
    $this->event_cost=htmlspecialchars(strip_tags($this->event_cost));
    $this->event_idle=htmlspecialchars(strip_tags($this->event_idle));
    $this->object_id=htmlspecialchars(strip_tags($this->object_id));

    // bind values
    $stmt->bindParam(":event_id", $this->event_id);
    $stmt->bindParam(":user_id", $this->user_id);
    $stmt->bindParam(":event_type_id", $this->event_type_id);
    $stmt->bindParam(":begin_dt", $this->begin_dt);
    $stmt->bindParam(":end_dt", $this->end_dt);
    $stmt->bindParam(":cft", $this->cft);
    $stmt->bindParam(":event_cost", $this->event_cost);
    $stmt->bindParam(":event_idle", $this->event_idle);
    $stmt->bindParam(":object_id", $this->object_id);

    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}

}

