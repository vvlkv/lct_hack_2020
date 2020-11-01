<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'lct_sql.php';
include_once 'lct_events.php';
 
// instantiate database and user object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$events = new Events($db);
 
// query users
$stmt = $events->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num > 0){
 
    //users array
    $events_arr=array();
    $events_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $events_item=array(
            "event_id" => $event_id,
            "user_id" => $user_id,
            "event_type_id" => $event_type_id,
			"begin_dt" => $begin_dt,
            "end_dt" => $end_dt,
			"cft" => $cft,
			"event_cost" => $event_cost,
            "event_idle" => $event_idle,
            "object_id" => $object_id
        );
 
        array_push($events_arr["records"], $events_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show users data in json format
    echo json_encode($events_arr, JSON_UNESCAPED_UNICODE);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no users found
    echo json_encode(
        array("message" => "No events found.")
    );
}
?>