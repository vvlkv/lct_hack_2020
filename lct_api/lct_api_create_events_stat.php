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
include_once 'lct_events_stat.php';
 
$database = new Database();
$db = $database->getConnection();
 
$event_stat = new Events_stat($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->event_stat_id) &&
    !empty($data->wire_id) &&
    !empty($data->begin_dt) &&
    !empty($data->end_dt) &&
    !empty($data->events_count) &&
    !empty($data->event_cost) &&
    !empty($data->round_cost)
){
 
    // set events property values
    $event_stat->event_stat_id = $data->event_stat_id;
    $event_stat->wire_id = $data->wire_id;
    $event_stat->begin_dt = $data->begin_dt;
    $event_stat->end_dt = $data->end_dt;
    $event_stat->events_count = $data->events_count;
    $event_stat->event_cost = $data->event_cost;
    $event_stat->round_cost = $data->round_cost;

    //$user->reg_date = date('Y-m-d H:i:s');
 
    // create the product
    if($event_stat->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the events
        echo json_encode(array("message" => "Events stat was created."));
    }
 
    // if unable to create the product, tell the events
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the events
        echo json_encode(array("message" => "Unable to create events stat."));
    }
}
 
// tell the events data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the events
    echo json_encode(array("message" => "Unable to create events stat. Data is incomplete."));
}
?>