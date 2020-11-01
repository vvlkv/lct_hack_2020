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
include_once 'lct_wires.php';
 
$database = new Database();
$db = $database->getConnection();
 
$wires = new Wires();
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->wire_id) &&
    !empty($data->client_id) &&
    !empty($data->wire_type_code) &&
    !empty($data->name) &&
    !empty($data->lat) &&
    !empty($data->lon) &&
    !empty($data->address_str) &&
	!empty($data->create_dt) &&
	!empty($data->begin_dt) &&
    !empty($data->end_dt) &&
    !empty($data->is_active) &&
    !empty($data->remark)
){
 
    // set user property values
    $wires->wire_id = $data->wire_id;
    $wires->client_id = $data->client_id;
    $wires->wire_type_code = $data->wire_type_code;
    $wires->name = $data->name;
    $wires->lat = $data->lat;
    $wires->lon = $data->lon;
    $wires->address_str = $data->address_str;
    $wires->create_dt = $data->create_dt;
    $wires->begin_dt = $data->begin_dt;
    $wires->end_dt = $data->end_dt;
    $wires->is_active = $data->is_active;
    $wires->remark = $data->remark;

    //$user->reg_date = date('Y-m-d H:i:s');
 
    // create the product
    if($wires->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Wires was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create wires."));
    }
}
 
// tell the wires data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the wires
    echo json_encode(array("message" => "Unable to create wires. Data is incomplete."));
}
?>