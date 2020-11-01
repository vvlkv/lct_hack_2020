<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_view_objects.php';
 
// instantiate database and user object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$objects = new Objects($db);
 
// query users
$stmt = $objects->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0){
 
    //users array
    $users_arr=array();
    $users_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $user_item=array(
            "id" => $id,
            "name" => $name,
            "company_id" => $company_id,
			"polygon_lat1" => $polygon_lat1,
            "polygon_lon1" => $polygon_lon1,
			"polygon_lat2" => $polygon_lat2,
			"polygon_lon2" => $polygon_lon2,
            "polygon_lat3" => $polygon_lat3,
            "polygon_lon3" => $polygon_lon3,
            "polygon_lat4" => $polygon_lat4,
            "polygon_lon5" => $polygon_lon5,
            "address_str" => $address_str,
            "begin_dt" => $begin_dt,
            "end_dt" => $end_dt,
            "timetable" => $timetable,
            "company_name" => $company_name
        );
        
        array_push($users_arr["records"], $user_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show users data in json format
    echo json_encode($users_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no users found
    echo json_encode(
        array("message" => "No objects found.")
    );
}
?>