<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_events.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare request object
$events = new Events($db);
 
// set ID property of record to read
$events->user_id = isset($_GET['event_id']) ? $_GET['event_id'] : die();
 
if($events->event_id!=null){
    // create array
    $event_arr = array(
		"event_id" => $events->event_id
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($event_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user request does not exist
    echo json_encode(array("message" => "Events does not exist."));
}
?>