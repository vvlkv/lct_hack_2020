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
include_once 'lct_user.php';
 
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->surname) &&
    !empty($data->code) &&
    !empty($data->name) &&
    !empty($data->create_dt) &&
    !empty($data->user_state_id) &&
    !empty($data->user_group_id) &&
    !empty($data->lastname) &&
	!empty($data->phone) &&
	!empty($data->pincode)
){
 
    // set user property values
    $user->surname = $data->surname;
    $user->code = $data->code;
    $user->name = $data->name;
    $user->create_dt = $data->create_dt;
    $user->user_state_id = $data->user_state_id;
    $user->user_group_id = $data->user_group_id;
    $user->lastname = $data->lastname;
    $user->phone = $data->phone;
    $user->pincode = $data->pincode;

    //$user->reg_date = date('Y-m-d H:i:s');
 
    // create the product
    if($user->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "User was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create user."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>