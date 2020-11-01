<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_personal.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare request object
$personal = new Personal($db);
 
// set ID property of record to read
$personal->personal_id = isset($_GET['personal_id']) ? $_GET['personal_id'] : die();
 
if($personal->personal_id!=null){
    // create array
    $personal_arr = array(
		"personal_id" => $personal->personal_id
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($personal_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user request does not exist
    echo json_encode(array("message" => "Personal does not exist."));
}
?>