<?php
class Personal{
 
    // database connection and table name
    private $conn;
    private $table_name = "personal";
 
    // object properties
    public $personal_id;
    public $last_name;
    public $first_name;
    public $sec_name;
    public $user_login;
    public $user_active;
	public $user_pass;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read personal
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


// create personal
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
              SET personal_id=:personal_id, last_name=:last_name, first_name=:first_name, sec_name=:sec_name, user_login=:user_login, user_active=:user_active, 
			      user_pass=:user_pass";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->personal_id=htmlspecialchars(strip_tags($this->personal_id));
    $this->last_name=htmlspecialchars(strip_tags($this->last_name));
    $this->first_name=htmlspecialchars(strip_tags($this->first_name));
    $this->sec_name=htmlspecialchars(strip_tags($this->sec_name));
    $this->user_login=htmlspecialchars(strip_tags($this->user_login));
    $this->user_active=htmlspecialchars(strip_tags($this->user_active));
    $this->user_pass=htmlspecialchars(strip_tags($this->user_pass));
 
    // bind values
    $stmt->bindParam(":personal_id", $this->personal_id);
    $stmt->bindParam(":last_name", $this->last_name);
    $stmt->bindParam(":first_name", $this->first_name);
    $stmt->bindParam(":sec_name", $this->sec_name);
    $stmt->bindParam(":user_login", $this->user_login);
    $stmt->bindParam(":user_active", $this->user_active);
    $stmt->bindParam(":user_pass", $this->user_pass);

    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}

}

