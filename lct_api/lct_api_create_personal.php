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
include_once 'lct_personal.php';
 
$database = new Database();
$db = $database->getConnection();
 
$personal = new Personal($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->last_name) &&
    !empty($data->first_name) &&
    !empty($data->sec_name) &&
    !empty($data->user_login) &&
    !empty($data->user_active) &&
    !empty($data->user_pass)
){
 
    // set user property values
    $personal->last_name = $data->last_name;
    $personal->first_name = $data->first_name;
    $personal->sec_name = $data->sec_name;
    $personal->user_login = $data->user_login;
    $personal->user_active = $data->user_active;
    $personal->user_pass = $data->user_pass;

    //$user->reg_date = date('Y-m-d H:i:s');
 
    // create the product
    if($personal->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Personal was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create personal."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create personal. Data is incomplete."));
}
?>