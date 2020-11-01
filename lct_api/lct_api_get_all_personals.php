<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_personal.php';
 
// instantiate database and user object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$personal = new Personal($db);
 
// query users
$stmt = $personal->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0){
 
    //users array
    $personals_arr=array();
    $personals_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $user_item=array(
            "personal_id" => $personal_id,
            "last_name" => $last_name,
            "first_name" => $first_name,
			"sec_name" => $sec_name,
            "user_login" => $user_login,
			"user_active" => $user_active,
			"user_pass" => $user_pass,
        );
 
        array_push($personals_arr["records"], $user_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show users data in json format
    echo json_encode($personals_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no users found
    echo json_encode(
        array("message" => "No personals found.")
    );
}
?>