<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once 'lct_sql.php';
// instantiate user object
include_once 'lct_events.php';
 
$database = new Database();
$db = $database->getConnection();
 
$event = new Events($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->user_id) &&
    !empty($data->event_type_id) &&
    !empty($data->begin_dt) &&
    !empty($data->end_dt) &&
    !empty($data->cft) &&
    !empty($data->event_cost) &&
    !empty($data->event_idle) &&
	!empty($data->object_id)
){
 
    // set events property values
    $event->user_id = $data->user_id;
    $event->event_type_id = $data->event_type_id;
    $event->begin_dt = $data->begin_dt;
    $event->end_dt = $data->end_dt;
    $event->cft = $data->cft;
    $event->event_cost = $data->event_cost;
    $event->event_idle = $data->event_idle;
    $event->object_id = $data->object_id;

    //$user->reg_date = date('Y-m-d H:i:s');
 
    // create the product
    if($event->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the events
        echo json_encode(array("message" => "Events was created."));
    }
 
    // if unable to create the product, tell the events
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the events
        echo json_encode(array("message" => "Unable to create events."));
    }
}
 
// tell the events data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the events
    echo json_encode(array("message" => "Unable to create events. Data is incomplete."));
}
?>