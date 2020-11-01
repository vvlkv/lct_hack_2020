<?php
class Events_stat{
 
    // database connection and table name
    private $conn;
    private $table_name = "events_stat";
 
    // object properties
    public $event_stat_id;
    public $wire_id;
    public $begin_dt;
    public $end_dt;
    public $events_count;
    public $event_cost;
	public $round_cost;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read events_stat
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


// create event_stat
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
              SET event_stat_id=:event_stat_id, wire_id=:wire_id, begin_dt=:begin_dt, events_count=:events_count, events_count=:events_count, 
			      round_cost=:round_cost";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->event_stat_id=htmlspecialchars(strip_tags($this->event_stat_id));
    $this->wire_id=htmlspecialchars(strip_tags($this->wire_id));
    $this->begin_dt=htmlspecialchars(strip_tags($this->begin_dt));
    $this->events_count=htmlspecialchars(strip_tags($this->events_count));
    $this->event_cost=htmlspecialchars(strip_tags($this->event_cost));
    $this->round_cost=htmlspecialchars(strip_tags($this->round_cost));
 
    // bind values
    $stmt->bindParam(":event_stat_id", $this->event_stat_id);
    $stmt->bindParam(":wire_id", $this->wire_id);
    $stmt->bindParam(":begin_dt", $this->begin_dt);
    $stmt->bindParam(":events_count", $this->events_count);
    $stmt->bindParam(":event_cost", $this->event_cost);
    $stmt->bindParam(":round_cost", $this->round_cost);

    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}

}

