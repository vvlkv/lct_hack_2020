<?php
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $user_id;
    public $surname;
    public $code;
    public $name;
    public $create_dt;
    public $user_state_id;
	public $user_group_id;
    public $lastname;
    public $phone;
	public $pincode;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read users
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


// create user
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
              SET user_id=:user_id, surname=:surname, code=:code, name=:name, create_dt=:create_dt, 
			      user_state_id=:user_state_id, user_group_id=:user_group_id, lastname=:lastname,
			      phone=:phone, pincode=:pincode";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->user_id=htmlspecialchars(strip_tags($this->user_id));
    $this->surname=htmlspecialchars(strip_tags($this->surname));
    $this->code=htmlspecialchars(strip_tags($this->code));
    $this->create_dt=htmlspecialchars(strip_tags($this->create_dt));
    $this->user_state_id=htmlspecialchars(strip_tags($this->user_state_id));
    $this->user_group_id=htmlspecialchars(strip_tags($this->user_group_id));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->phone=htmlspecialchars(strip_tags($this->phone));
    $this->pincode=htmlspecialchars(strip_tags($this->pincode));
 
    // bind values
    $stmt->bindParam(":user_id", $this->user_id);
    $stmt->bindParam(":surname", $this->surname);
    $stmt->bindParam(":code", $this->code);
    $stmt->bindParam(":create_dt", $this->create_dt);
    $stmt->bindParam(":user_state_id", $this->user_state_id);
    $stmt->bindParam(":user_group_id", $this->user_group_id);
    $stmt->bindParam(":lastname", $this->lastname);
    $stmt->bindParam(":phone", $this->phone);
    $stmt->bindParam(":pincode", $this->pincode);

    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}

}

