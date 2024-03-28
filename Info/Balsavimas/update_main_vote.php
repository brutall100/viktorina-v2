<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../x_configDB.php'; 

$sql = "SELECT x_vote_suggestion.*, COUNT(x_vote.vote_suggest_id) AS yes_vote_count
        FROM x_vote_suggestion
        LEFT JOIN x_vote ON x_vote_suggestion.id = x_vote.vote_suggest_id
        GROUP BY x_vote_suggestion.id
        ORDER BY yes_vote_count DESC, x_vote_suggestion.id DESC
        LIMIT 1";

$result = $conn->query($sql);

$response = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = array(
            "id" => $row["id"],
            "usname" => $row["usname"],
            "usid" => $row["usid"],
            "suggestion" => $row["suggestion"]
        );
    }
} else {
    $response["error"] = "No votes found.";
}

echo json_encode($response);

$conn->close();
?>

