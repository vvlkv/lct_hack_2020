<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare request object
$user = new User($db);
 
// set ID property of record to read
$user->user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();
 
if($user->create_dt!=null){
    // create array
    $user_arr = array(
		"create_dt" => $user->create_dt
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($user_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user request does not exist
    echo json_encode(array("message" => "User does not exist."));
}
?>