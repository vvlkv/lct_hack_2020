<?php
class Wires{
 
    // database connection and table name
    private $conn;
    private $table_name = "wires";
 
    // object properties
    public $wire_id;
    public $client_id;
    public $wire_type_code;
    public $name;
    public $lat;
    public $lon;
	public $address_str;
    public $create_dt;
    public $begin_dt;
	public $end_dt;
	public $is_active;
	public $remark;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read wires
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


// create wire
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
              SET wire_id=:wire_id, client_id=:client_id, wire_type_code=:wire_type_code, lat=:lat, lon=:lon, 
			      address_str=:address_str, create_dt=:create_dt, begin_dt=:begin_dt,
			      end_dt=:end_dt, is_active=:is_active, remark=:remark";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->wire_id=htmlspecialchars(strip_tags($this->wire_id));
    $this->client_id=htmlspecialchars(strip_tags($this->client_id));
    $this->wire_type_code=htmlspecialchars(strip_tags($this->wire_type_code));
    $this->lat=htmlspecialchars(strip_tags($this->lat));
    $this->lon=htmlspecialchars(strip_tags($this->lon));
    $this->address_str=htmlspecialchars(strip_tags($this->address_str));
    $this->create_dt=htmlspecialchars(strip_tags($this->create_dt));
    $this->begin_dt=htmlspecialchars(strip_tags($this->begin_dt));
    $this->end_dt=htmlspecialchars(strip_tags($this->end_dt));
    $this->is_active=htmlspecialchars(strip_tags($this->is_active));
    $this->remark=htmlspecialchars(strip_tags($this->remark));

    // bind values
    $stmt->bindParam(":wire_id", $this->wire_id);
    $stmt->bindParam(":client_id", $this->client_id);
    $stmt->bindParam(":wire_type_code", $this->wire_type_code);
    $stmt->bindParam(":lat", $this->lat);
    $stmt->bindParam(":lon", $this->lon);
    $stmt->bindParam(":address_str", $this->address_str);
    $stmt->bindParam(":create_dt", $this->create_dt);
    $stmt->bindParam(":begin_dt", $this->begin_dt);
    $stmt->bindParam(":end_dt", $this->end_dt);
    $stmt->bindParam(":is_active", $this->is_active);
    $stmt->bindParam(":remark", $this->remark);

    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}

}

